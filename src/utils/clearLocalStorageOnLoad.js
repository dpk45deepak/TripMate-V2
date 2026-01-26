const clearLocalStorageOnLoad = () => {
    try {
        localStorage.clear();
        console.log("✅ LocalStorage cleared on landing");
    } catch (error) {
        console.error("❌ Failed to clear LocalStorage:", error);
    }
};

export default clearLocalStorageOnLoad;
