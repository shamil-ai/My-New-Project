// Firebase അല്ലെങ്കിൽ നിങ്ങളുടെ ബാക്ക്-എൻഡ് കണക്ട് ചെയ്യാനുള്ള കോൺഫിഗറേഷൻ
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "manhajul-hidaya.firebaseapp.com",
    projectId: "manhajul-hidaya",
    storageBucket: "manhajul-hidaya.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Backend API (Firebase/Supabase)
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

/* =========================================
   1. PHOTO MANAGEMENT (Upload to Database)
========================================= */
async function uploadPhotoData(photoDetails) {
    try {
        console.log("Uploading photo to backend...", photoDetails);
        // const docRef = await addDoc(collection(db, "photos"), photoDetails);
        // console.log("Document written with ID: ", docRef.id);
        
        showToast("Photo saved to database successfully!");
    } catch (e) {
        console.error("Error adding document: ", e);
        // സേവ് ചെയ്യാൻ പറ്റിയില്ലെങ്കിൽ ഓഫ്‌ലൈൻ കാഷെയിലേക്ക് മാറ്റുന്നു (Step 6-ൽ പറഞ്ഞത് പോലെ)
        saveToLocalCache('photos', photoDetails); 
    }
}

/* =========================================
   2. SYNC FUNCTION (Main App ↔ Admin Panel)
========================================= */
async function fetchAllDataToSync() {
    console.log("Fetching latest data from backend...");
    try {
        // const querySnapshot = await getDocs(collection(db, "settings"));
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        // });
        
        document.getElementById('sync-status').innerHTML = "🟢 Online (Synced)";
    } catch (error) {
        console.log("Offline mode active. Loading from local storage.");
    }
}

/* =========================================
   3. JERSEY MANAGEMENT (CRUD Operations)
========================================= */
async function addJerseyToDatabase(jerseyData) {
    // Database-ലേക്ക് ജേഴ്സി വിവരങ്ങൾ അയക്കുന്ന കോഡ്
    console.log("Adding Jersey: ", jerseyData);
}

async function deleteJersey(jerseyId) {
    // Database-ൽ നിന്ന് ഡിലീറ്റ് ചെയ്യാനുള്ള കോഡ്
    // await deleteDoc(doc(db, "jerseys", jerseyId));
    console.log("Deleted Jersey ID: ", jerseyId);
}
