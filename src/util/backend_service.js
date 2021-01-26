import axios from "axios";

const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class BackendService {
  static getPolicyByCustomerId(customerId) {
    return axios
      .get(`http://localhost:3000/api/policy/cust/${customerId}`)
      .then(({ data }) => {
        const customerPolicyArr = [];
        data["data"].forEach((customerPolicy) => {
          customerPolicyArr.push(customerPolicy.policyDetails.policyId);
        });
        return customerPolicyArr;
      });
  }
  static getAllPolicy() {
    return axios
      .get("http://localhost:3000/api/policy/data")
      .then(({ data }) => {
        return data["data"].map((policyItem) => {
          const modifiedPolicyItem = {
            ...policyItem,
            id: policyItem.policyId,
            date: new Date(policyItem.date).toDateString(),
            customerId: policyItem.customerDetails[0].customerId,
            gender: policyItem.customerDetails[0].gender,
            income: policyItem.customerDetails[0].income,
            region: policyItem.customerDetails[0].region,
          };
          delete modifiedPolicyItem["customerDetails"];
          delete modifiedPolicyItem["_id"];
          delete modifiedPolicyItem["customer"];
          return modifiedPolicyItem;
        });
      });
  }

  static getPolicyByPolicyId(policyId) {
    axios.get(`/policy/${policyId}`).then(({ data }) => {});
  }

  static updatePolicyDetails(policyData) {
    return axios
      .put("http://localhost:3000/api/policy/update", policyData)
      .then((res) => {
        if (res.status === 200) {
          return "Sucessfully updated";
        }
        return "Something went wrong";
      });
  }

  static getChartData(region) {
    return axios
      .get(`http://localhost:3000/api/policy/chart/${region}`)
      .then(({ data }) => {
        let label = [];
        let dataSet = [];
        data["data"].forEach((chartData) => {
          label.push(Number(chartData["_id"].month) - 1);
          dataSet.push(chartData.policyCount);
        });
        label = label.sort((a, b) => a - b).map((month) => monthArr[month]);
        return { label, dataSet };
      });
  }
}

export default BackendService;
