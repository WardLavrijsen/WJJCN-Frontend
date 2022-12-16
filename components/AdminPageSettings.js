import adminSytles from "../styles/admin/AdminSettings.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminPageSettings({
  token,
  setError,
  setErrorState,
  setErrorColor,
  date,
  time,
}) {
  const router = useRouter();

  const [frequency, setFrequency] = useState("");
  const [specifiteDate, setSpecifiteDate] = useState("");

  const [day, setDay] = useState(date);
  const [scrapeTime, setScrapeTime] = useState(time);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 2000);
    } else {
      const res = await fetch("/api/newpassword", {
        method: "POST",
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      });
      const response = await res.json();
      console.log(response);
      if (response.status === "ok") {
        setError("Password changed successfully");
        setErrorState(true);
        setErrorColor("#27ae60");

        setTimeout(() => {
          setErrorState(false);
          router.push("/woc-admin");
        }, 3000);
      }
    }
  };

  const handleSettingsChange = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={adminSytles.div3}>
      <div className={adminSytles.displayCardSettings}>
        <form onSubmit={handleSettingsChange}>
          <h1 className={adminSytles.settingsTitle}>Settings</h1>
          <h3 className={adminSytles.settingsLabel}>
            Frequency to run scraper:
          </h3>
          <select
            className={adminSytles.settingsInput}
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>

          {frequency === "Monthly" ? (
            <>
              <h3
                style={{ marginTop: "1vh" }}
                className={adminSytles.settingsLabel}
              >
                Date to run scraper:
              </h3>
              <select
                className={adminSytles.settingsInput}
                type="text"
                value={specifiteDate}
                onChange={(e) => setSpecifiteDate(e.target.value)}
              >
                {Array(28)
                  .join()
                  .split(",")
                  .map(
                    function (a) {
                      return this.i++;
                    },
                    { i: 1 }
                  )
                  .map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
              </select>
            </>
          ) : null}
          {frequency === "Weekly" ? (
            <>
              <h3
                style={{ marginTop: "1vh" }}
                className={adminSytles.settingsLabel}
              >
                Day to run scraper:
              </h3>
              <select
                className={adminSytles.settingsInput}
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </>
          ) : null}
          {frequency === "Daily" ? (
            <>
              <h3
                style={{ marginTop: "1vh" }}
                className={adminSytles.settingsLabel}
              >
                Time to run scraper:
              </h3>

              <input
                className={adminSytles.settingsInput}
                type="time"
                onChange={(e) => setScrapeTime(e.target.value)}
                value={scrapeTime}
              />
            </>
          ) : null}

          <input
            type="submit"
            className={adminSytles.settingsButton}
            value="Save Settings"
          />
        </form>

        <h3 style={{ marginTop: "3vh" }} className={adminSytles.settingsLabel}>
          New Password:
        </h3>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={adminSytles.settingsInput}
          type="password"
        />
        <h3 style={{ marginTop: "1vh" }} className={adminSytles.settingsLabel}>
          Confirm Password:
        </h3>
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className={adminSytles.settingsInput}
          type="password"
        />
        <button
          onClick={handlePasswordChange}
          className={adminSytles.settingsButton}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
