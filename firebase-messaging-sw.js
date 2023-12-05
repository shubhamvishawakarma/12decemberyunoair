
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDpvg_yU_5Vy50xhmazhQttRzJrmiNoHXw",
  authDomain: "nakshtratalk-c3e11.firebaseapp.com",
  databaseURL: "https://nakshtratalk-c3e11-default-rtdb.firebaseio.com",
  projectId: "nakshtratalk-c3e11",
  storageBucket: "nakshtratalk-c3e11.appspot.com",
  messagingSenderId: "564770298148",
  appId: "1:564770298148:web:81b471c099e45a05eabbb1"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();



messaging.onBackgroundMessage(async (payload) => {
  console.log("Background message received:", payload.data);

  // Store the data in Cache Storage
  const cache = await caches.open("fcm-data-cache");
  await cache.put("fcm-data", new Response(JSON.stringify(payload.data)));


  // Send a message to all connected clients (including the React app)
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: "fcmDataUpdate",
        data: payload.data
      });
    });
  });

  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,

    // other notification options
  };



  await self.registration.showNotification(payload.notification.title, notificationOptions);
});

















// importScripts(
//     "https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js"
//   );
//   importScripts(
//     "https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js"
//   );
  
//   const firebaseConfig = {
//     apiKey: "AIzaSyD2SCZ6dMcANWVXuOESJqiJ_pUBofHBppg",
//     authDomain: "yuonair-2aa1b.firebaseapp.com",
//     databaseURL: "https://yuonair-2aa1b-default-rtdb.firebaseio.com",
//     projectId: "yuonair-2aa1b",
//     storageBucket: "yuonair-2aa1b.appspot.com",
//     messagingSenderId: "1004517911619",
//     appId: "1:1004517911619:web:7cf599db7e732b9589f8f6",
//     measurementId: "G-JZK43EBG1Y",
//   };
  
//   firebase.initializeApp(firebaseConfig);
//   const messaging = firebase.messaging();
  
//   messaging.onBackgroundMessage(async (payload) => {
//     console.log("Background message received:", payload.data);
  
//     // Store the data in Cache Storage
//     const cache = await caches.open("fcm-data-cache");
//     await cache.put("fcm-data", new Response(JSON.stringify(payload.data)));
  
    
//     self.clients.matchAll().then((clients) => {
//       clients.forEach((client) => {
//         client.postMessage({
//           type: "fcmDataUpdate",
//           data: payload.data,
//         });
//       });
//     });
  
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: payload.notification.icon,
  
      
//     };
  
//     await self.registration.showNotification(
//       payload.notification.title,
//       notificationOptions
//     );
//   });
  