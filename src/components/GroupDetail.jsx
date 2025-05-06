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
import ShareContent, { errorCheck } from "./ShareContent";

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

const stringForPending = (pendingAmount) => {
  if (pendingAmount === 0) {
    return null;
  }
  if (pendingAmount < 0) {
    return <p className="text-red-500">You owe {-1 * pendingAmount}₹</p>;
  }
  return <p className="text-green-500">You are owed {pendingAmount}₹</p>;
};

const isPayloadValid = (payload) => {
  if (
    !payload?.name ||
    !payload?.amount ||
    payload?.name?.length < 3 ||
    payload?.name?.length > 30 ||
    Number(payload?.amount) <= 0 ||
    !payload?.paidBy ||
    !payload?.owedBy
  ) {
    return false;
  }
  return true;
};

const GroupDetail = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);

  const [payload, setPayload] = useState({});

  const expensesData = useSelector((store) => store.expenses);
  const userData = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [openPaidBy, setOpenPaidBy] = useState(false);
  const [openSettleUpModal, setOpenSettleUpModal] = useState(false);

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

  return (
    <div>
      <div>
        <DashboardNav
          titleNav={groupData?.name}
          buttonText="Create Expense"
          onClickButton={() => setOpen(true)}
          infoData={() => {
            return (
              <div className="flex gap-2 items-center">
                {expensesData?.userSet?.[userData?.email] !== 0 && (
                  <>
                    <div className="dropdown dropdown-right dropdown-hover">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-ghost btn-xs text-info"
                      >
                        <svg
                          tabIndex={0}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          class="h-4 w-4 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <div
                        tabIndex={0}
                        class="card card-sm dropdown-content bg-base-100 rounded-box z-1 w-64 shadow-sm"
                      >
                        <div tabIndex={0} className="card-body">
                          <h2 className="card-title">
                            {stringForPending(
                              expensesData?.userSet?.[userData?.email]
                            )}
                          </h2>
                          {expensesData?.totalPendingAmountArray
                            ?.filter(
                              (item) =>
                                item?.fromUser === userData?.email ||
                                item?.toUser === userData?.email
                            )
                            ?.map((item) => {
                              if (item?.fromUser === userData?.email) {
                                return (
                                  <p>
                                    You owe {item?.toUser} {item?.amount}₹
                                  </p>
                                );
                              }
                              return (
                                <p>
                                  You are owed {item?.fromUser} {item?.amount}₹
                                </p>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tooltip tooltip-primary"
                      data-tip="Settle Up"
                    >
                      <button
                        className="btn btn-xs btn-circle btn-secondary"
                        onClick={() => setOpenSettleUpModal(true)}
                      >
                        S
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          }}
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
          isDisabled={!isPayloadValid(payload)}
          children={
            <CreateExpenseBody
              payload={payload}
              setPayload={setPayload}
              setOpenPaidBy={setOpenPaidBy}
              groupData={groupData}
            />
          }
          width="100%"
        />
      )}
      {openPaidBy && (
        <div>
          <Modal
            open={openPaidBy}
            onClose={() => setOpenPaidBy(false)}
            width="w-auto"
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
            isDisabled={
              btn === OPTIONS_SPLIT.split &&
              errorCheck(activeTab, payload?.data, payload)
            }
          >
            <div>
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
                <div className="mt-2">
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
      {openSettleUpModal && (
        <Modal
          open={openSettleUpModal}
          onClose={() => setOpenSettleUpModal(false)}
          width="w-auto"
          titleTxt="Settle Up"
          saveBtnText="Settle Up"
          onSubmit={() => {
            const amount =
              expensesData?.userSet?.[userData?.email] >= 0
                ? Number(expensesData?.userSet?.[userData?.email])
                : -1 * Number(expensesData?.userSet?.[userData?.email]);

            const paidByOrOwedBy = expensesData?.totalPendingAmountArray
              ?.filter(
                (item) =>
                  item?.fromUser === userData?.email ||
                  item?.toUser === userData?.email
              )
              ?.map((item) => ({
                email:
                  userData?.email === item?.toUser
                    ? item?.fromUser
                    : item?.toUser,
                amount: item?.amount,
              }));

            if (expensesData?.userSet?.[userData?.email] >= 0) {
              handleCreateExpense({
                name: `Settle Up by ${userData?.email}`,
                amount,
                groupId,
                paidBy: paidByOrOwedBy,
                owedBy: [
                  {
                    email: userData?.email,
                    amount,
                  },
                ],
              });
            } else {
              handleCreateExpense({
                name: `Settle Up by ${userData?.email}`,
                amount,
                groupId,
                paidBy: [
                  {
                    email: userData?.email,
                    amount,
                  },
                ],
                owedBy: paidByOrOwedBy,
              });
            }

            setOpenSettleUpModal(false);
          }}
        >
          <h2>{stringForPending(expensesData?.userSet?.[userData?.email])}</h2>
        </Modal>
      )}
    </div>
  );
};

export default GroupDetail;
