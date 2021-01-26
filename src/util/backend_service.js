import axios from "axios";

const instance = axios.create({ baseURL: "http:localhost:3000/api" });

class BackendService {
  static getPolicyByCustomerId(customerId) {
    instance.get(`/policy/cust/${customerId}`).then(({ data }) => {});
  }
  static getAllPolicy() {
    return axios
      .get("http://localhost:3000/api/policy/data")
      .then(({ data }) => {
        return data["data"].map((policyItem) => {
          const modifiedPolicyItem = {
            ...policyItem,
            id: policyItem.policyId,
            customerId: policyItem.customerDetails[0].customerId,
            gender: policyItem.customerDetails[0].gender,
            income: policyItem.customerDetails[0].income,
            region: policyItem.customerDetails[0].region,
            martialStatus: policyItem.customerDetails[0].martialStatus,
          };
          delete modifiedPolicyItem["customerDetails"];
          delete modifiedPolicyItem["_id"];
          delete modifiedPolicyItem["customer"];
          return modifiedPolicyItem;
        });
      });
  }

  static getPolicyByPolicyId(policyId) {
    instance.get(`/policy/${policyId}`).then(({ data }) => {});
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
          label.push(chartData["_id"].month);
          dataSet.push(chartData.policyCount);
        });
        return { label, dataSet };
      });
  }
}

export default BackendService;
