import React, { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Expenses from "./Expenses";
import { addExpenses } from "../store/slices/expensesSlice";
import CreateExpenseBody from "./CreateExpenseBody";
import Modal from "./Modal";
import Tabs from "./Tabs";
import ShareContent from "./ShareContent";

const OPTIONS_SPLIT = {
  split: "Split the expense",
  youOwe: "You owe the full amount",
  theyOwe: "They owe the full amount",
};

export const TABS_DATA = {
  split_by_amount: "Amount",
  split_by_percentage: "Percentage",
  split_by_share: "Share",
};

const calculateFinalAmount = (amount, percentage) => {
  return (Number(amount) * Number(percentage)) / 100;
};

const calculateShareAmount = (totalAmount, shares, totalShares) => {
  // Handle edge cases
  if (!totalAmount || !shares || !totalShares) return 0;
  if (isNaN(totalAmount) || isNaN(shares) || isNaN(totalShares)) return 0;

  // Calculate amount per share
  const amountPerShare = totalAmount / totalShares;
  // Calculate final amount for given shares
  const finalAmount = amountPerShare * shares;

  // Round to 2 decimal places
  return Math.round(finalAmount * 100) / 100;
};

const GroupDetail = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);

  const [payload, setPayload] = useState({});

  const expensesData = useSelector((store) => store.expenses);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [openPaidBy, setOpenPaidBy] = useState(false);
  const [btn, setBtn] = useState(OPTIONS_SPLIT.split);
  const [activeTab, setActiveTab] = useState(TABS_DATA.split_by_amount);

  const tabsData = [
    {
      label: TABS_DATA.split_by_amount,
      content: (
        <ShareContent
          tab={TABS_DATA.split_by_amount}
          groupData={groupData}
          payload={payload}
          setPayload={setPayload}
          activeTab={activeTab}
        />
      ),
    },
    {
      label: TABS_DATA.split_by_percentage,
      content: (
        <ShareContent
          tab={TABS_DATA.split_by_percentage}
          groupData={groupData}
          payload={payload}
          setPayload={setPayload}
          activeTab={activeTab}
        />
      ),
    },
    {
      label: TABS_DATA.split_by_share,
      content: (
        <ShareContent
          tab={TABS_DATA.split_by_share}
          groupData={groupData}
          payload={payload}
          activeTab={activeTab}
          setPayload={setPayload}
        />
      ),
    },
  ];

  const fetchGroupData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/group/" + groupId, {
        withCredentials: true,
      });

      setGroupData(res.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/expense/group/summary/" + groupId,
        {
          withCredentials: true,
        }
      );
      console.log(res.data?.data);
      dispatch(addExpenses(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateExpense = async (payloadData) => {
    try {
      const res = await axios.post(BASE_URL + "/expense/create", payloadData, {
        withCredentials: true,
      });
      setPayload({});
      fetchExpenseData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroupData();
    fetchExpenseData();
  }, []);
  console.log("test,", payload);
  return (
    <div>
      <div>
        <DashboardNav
          titleNav={groupData?.name}
          buttonText="Create Expense"
          onClickButton={() => setOpen(true)}
        />
      </div>
      <div>
        <Expenses expensesData={expensesData} />
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={() => {
            handleCreateExpense({
              name: payload?.name,
              amount: Number(payload?.amount),
              groupId,
              paidBy: [
                {
                  email: payload?.paidBy,
                  amount: Number(payload?.amount),
                },
              ],
              owedBy: payload?.owedBy,
            });

            setOpen(false);
          }}
          children={
            <CreateExpenseBody
              payload={payload}
              setPayload={setPayload}
              setOpenPaidBy={setOpenPaidBy}
              groupData={groupData}
            />
          }
        />
      )}
      {openPaidBy && (
        <div>
          <Modal
            open={openPaidBy}
            onClose={() => setOpenPaidBy(false)}
            width="w-2xl"
            saveBtnText="Save"
            onSubmit={() => {
              if (btn === OPTIONS_SPLIT.split) {
                if (activeTab === TABS_DATA.split_by_amount) {
                  setPayload((prev) => ({
                    ...prev,
                    owedBy: Object.keys(payload?.data)?.map((key) => ({
                      email: key,
                      amount: Number(payload?.data[key]),
                    })),
                  }));
                }

                if (activeTab === TABS_DATA.split_by_percentage) {
                  setPayload((prev) => ({
                    ...prev,
                    owedBy: Object.keys(payload?.data)?.map((key) => ({
                      email: key,
                      amount: calculateFinalAmount(
                        Number(payload?.amount),
                        Number(payload?.data[key])
                      ),
                    })),
                  }));
                }

                if (activeTab === TABS_DATA.split_by_share) {
                  const totalShares = Object.values(payload?.data || {}).reduce(
                    (acc, curr) => acc + Number(curr),
                    0
                  );

                  console.log("test,", totalShares);

                  setPayload((prev) => ({
                    ...prev,
                    owedBy: Object.keys(payload?.data)?.map((key) => ({
                      email: key,
                      amount: calculateShareAmount(
                        Number(payload?.amount),
                        Number(payload?.data[key]),
                        totalShares
                      ),
                    })),
                  }));
                }
              }

              if (btn === OPTIONS_SPLIT.youOwe) {
                setPayload((prev) => ({
                  ...prev,
                  owedBy: [
                    {
                      email: payload?.paidBy,
                      amount: Number(payload?.amount),
                    },
                  ],
                }));
              }

              if (btn === OPTIONS_SPLIT.theyOwe) {
                const othersNumber = groupData?.participants?.length - 1;
                const amountAmongOthers =
                  othersNumber !== 0
                    ? Number(payload?.amount) / othersNumber
                    : 0;

                setPayload((prev) => ({
                  ...prev,
                  owedBy: groupData?.participants
                    ?.map((participant) => ({
                      email: participant,
                      amount:
                        participant === payload?.paidBy ? 0 : amountAmongOthers,
                    }))
                    .filter(
                      (participant) => participant.email !== payload?.paidBy
                    ),
                }));
              }

              setOpenPaidBy(false);
            }}
          >
            <div>
              <p>Owed By</p>
              <div className="flex flex-col gap-2">
                <button
                  className={
                    "btn btn-sm " +
                    (btn === OPTIONS_SPLIT.split
                      ? "btn-secondary"
                      : "btn-accent")
                  }
                  onClick={() => setBtn(OPTIONS_SPLIT.split)}
                >
                  Split the expense
                </button>
                <button
                  className={
                    "btn btn-sm " +
                    (btn === OPTIONS_SPLIT.youOwe
                      ? "btn-secondary"
                      : "btn-accent")
                  }
                  onClick={() => setBtn(OPTIONS_SPLIT.youOwe)}
                >
                  You owe the full amount
                </button>
                <button
                  className={
                    "btn btn-sm " +
                    (btn === OPTIONS_SPLIT.theyOwe
                      ? "btn-secondary"
                      : "btn-accent")
                  }
                  onClick={() => setBtn(OPTIONS_SPLIT.theyOwe)}
                >
                  They owe the full amount
                </button>
              </div>
              {btn === OPTIONS_SPLIT.split && (
                <div>
                  <Tabs
                    tabs={tabsData}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
