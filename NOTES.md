### **Quick Summary**

1. **Build**: 
   ```bash
   npm run build
   ```

2. **Sync**: 
   ```bash
   npx cap sync
   ```

3. **Open**: Open the `android` folder in Android Studio.

4. **Sync Gradle**: 
   - **File** > **Sync Project with Gradle Files** (in Android Studio).

5. **Build APK**: 
   - **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.

6. **Test**: Install or run the APK on a device/emulator.



# **Capacitor Android App Update Guide**

### **1. Build the React App**
In the terminal, navigate to your project directory and run:

```bash
npm run build
```

- This generates the latest production build of your React app in the `build` folder.

---

### **2. Sync Changes to Android**
Run the following command to sync the new build with Capacitor:

```bash
npx cap sync
```

- This ensures the web assets and configuration are copied to the Android project.

---

### **3. Open the Android Project in Android Studio**
1. Open **Android Studio**.
2. Go to **File** > **Open**.
3. Select the `android` folder inside your project directory:
   ```bash
   G:\Repos\Balance-Keeper\balance-keeper\android
   ```

---

### **4. Sync Gradle in Android Studio**
In **Android Studio**, sync the Gradle files to ensure everything is up to date:

- **File** > **Sync Project with Gradle Files**

---

### **5. Build the APK**
1. In Android Studio, go to:
   - **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
   
2. Wait for the APK to be built.

---

### **6. Test the APK**
- Once the APK is built, you can:
   - Transfer the APK to an Android device for testing.
   - Use an Android emulator to test the APK directly from Android Studio.

---

