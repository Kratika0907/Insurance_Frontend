import "./detail.css";

export const PolicyDetailCard = () => {
  return (
    <div className="policy-detail-container">
      <div className="policy-const">
        <p> Policy Number</p>
        <p>Customer Id</p>
        <p>Date of Issue</p>
      </div>
      <form
        className="policy-edit"
        onSubmit={() => console.log("I am form and I will be submitted")}
      >
        <label>
          Fuel :<input type="text" name="fuel"></input>
        </label>
        <label>
          Vehicle Segment :<input type="text" name="segment"></input>
        </label>
        <input type="submit" value="Submit Changes" />
      </form>
    </div>
  );
};
