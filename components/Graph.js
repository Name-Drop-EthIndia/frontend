import { graphClient } from "@/graph.config";
// Import restapi for function calls
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const sendNotification = async ({ query }) => {
  return graphClient
    .query({
      query: gql(query),
    })
    .then((data) => {
      // convert data here
      const isTransacionComplete = false;
      // if transacion occured call push
      if (isTransacionComplete) {
        pushNotification();
      }

      console.log("Subgraph data: ", data);
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
};

const pushNotification = async ({
  title,
  body,
  channelAddress1,
  channelAddress2,
  signer,
}) => {
  if (!(title && body)) {
    console.log("title and body are required");
    return;
  }
  try {
    console.log("start pushing notification");

    // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    const user1 = await userAlice.notification.subscribe(
      `eip155:11155111:${channelAddress1}`
    );
    const user2 = await userAlice.notification.subscribe(
      `eip155:11155111:${channelAddress2}`
    );
    if (user1.status == 204 && user2.status == 204) {
      // Send a notification to users of your protocol
      const apiResponse = await userAlice.channel.send(
        [channelAddress1, channelAddress2],
        {
          notification: {
            title,
            body,
          },
        }
      );
      //   check if successful
      if (apiResponse.status == 204) {
        console.log("notification sent");
        return;
      }
      console.log("failed to send notification");
    }
  } catch (error) {
    console.log("Error pushing notification: ", error);
  }
};

export { sendNotification };
