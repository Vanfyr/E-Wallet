import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewCard } from "../../redux/cardSlice";
import "../card/card.css";

const cardData = {
  cardName: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  ccv: "",
  bankName: "",
};

const Card = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [values, setValues] = useState(cardData);
  console.log(creditCard);

  const handleChange = (e) => {
    const nextCard = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(nextCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (creditCard.cardInformation.length <= 3) {
      dispatch(addNewCard(values));
      setValues(cardData);
      console.log(creditCard.cardInformation);
    } else {
      alert("Max limit");
    }
  };

  return (
    <>
      <small>NEW CARD</small>

      <div className="credit-card">
        <div className="credit-card__logo">{values.bankName}</div>

        <div className="credit-card__number">{values.cardNumber}</div>
        <span className="credit-ccv"> cvv {values.ccv}</span>
        <div className="credit-card__info">
          <div className="credit-card__info_name">
            <div className="credit-card__info_label">CARDHOLDER'S NAME</div>
            <div value={values.cardName}>{values.cardName}</div>
          </div>

          <div className="credit-card__info_expiry">
            <div className="credit-card__info_label">VALID UP TO</div>
            <div>
              {" "}
              {values.cardMonth} / {values.cardYear}
            </div>
          </div>
        </div>
      </div>

      <div>
        <form className="myForm" onSubmit={handleSubmit}>
          <label>
            {" "}
            Name
            <input
              type="text"
              name="cardName"
              value={values.cardName || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            {" "}
            Number
            <input
              type="text"
              pattern="[0-9]"
              maxLength="16"
              minLength="16"
              onChange={handleChange}
              name="cardNumber"
            />
          </label>
          <div>
            <label> Expiration Date</label>
            <div>
              {" "}
              Month
              <input
                type="text"
                pattern="[0-9]"
                maxLength="2"
                name="cardMonth"
                onChange={handleChange}
              />
            </div>
            <div>
              {" "}
              Year
              <input
                type="text"
                pattern="[0-9]"
                maxLength="2"
                minLength="2"
                name="cardYear"
                onChange={handleChange}
              />
            </div>
          </div>

          <label>
            CCV
            <input
              type="text"
              pattern="[0-9]"
              minLength="3"
              maxLength="3"
              name="ccv"
              onChange={handleChange}
            />
          </label>

          <select name="bankName" onChange={handleChange}>
            <option value="Mastercard"> MasterCard </option>
            <option value="Visa"> Visa </option>
            <option value="American Express"> American Express </option>
          </select>

          <button> Submit </button>
        </form>
      </div>
    </>
  );
};

export default Card;

