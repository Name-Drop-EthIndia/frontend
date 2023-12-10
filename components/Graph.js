import { graphClient } from "@/graph.config";
import { gql } from "@apollo/client";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
const events = {
  0: "EthIndia 2023",
};

const sendNotification = async ({
  query,
  endT = new Date().getTime(),
  startT = new Date().getTime() - 5 * 60 * 1000,
  // signer,
}) => {
  console.log("process.env.METAMASK_KEY: ", process.env.METAMASK_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_KEY);
  console.log(signer);
  if (!signer) {
    console.log("signer is required");
    return;
  }
  setTimeout(async () => {
    console.log("start sending graphql query");
    await graphClient
      .query({
        query: gql(
          query ||
            `query{
              profiles(where:{
                owner:"0x1dc6c61cdea731d2a61c5296e2c5898a7fd2bf0d"
              }) {
                id
                owner
                profileAddress
                uri
              }
            }`
        ),
      })
      .then(({ data }) => {
        // convert data here
        // const isTransacionComplete = false;
        // if transacion occured call push
        // if (isTransacionComplete) {
        console.log("data in gql: ", data);
        // if (!(data && data.profiles?.length == 0)) {
        //   console.log("no new profiles");
        //   return;
        // }
        const profile = data.profiles[0];
        console.log("data in gql: ", data, profile);
        // for (const ele of data.profiles) {
        //   const wallets = [];
        //   for (const user of ele) {
        //     const {
        //       profile: { owner },
        //       eventId,
        //     } = user;
        //     wallets.push(owner);
        //   }
        //   pushNotification({
        //     signer,
        //     title: "New Moment",
        //     body: events[eventId],
        //     channelAddress1: wallets[0],
        //     channelAddress2: wallets[1],
        //   });
        // }
        pushNotification({
          signer: signer,
          title: "New Moment",
          body: events[0],
          channelAddress1: profile.owner,
          // channelAddress2: wallets[1],
        });

        // }

        console.log("Subgraph data: ", data);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }, 10000);
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
    console.log(signer);

    // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    console.log(userAlice);

    const user1 = await userAlice.notification.subscribe(
      `eip155:11155111:${channelAddress1}`
    );
    // const user2 = await userAlice.notification.subscribe(
    //   `eip155:11155111:${channelAddress2}`
    // );
    if (user1.status == 204) {
      // Send a notification to users of your protocol
      const apiResponse = await userAlice.channel.send([channelAddress1], {
        notification: {
          title,
          body,
        },
      });
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
