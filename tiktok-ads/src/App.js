import { useState } from "react";

function App() {
  const [connected, setConnected] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("");
  const [musicOption, setMusicOption] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [uploadedSong, setUploadedSong] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Existing music (preview like real apps)
  const songs = [
    {
      id: "GANGNAM_STYLE",
      name: "Gangnam Style – PSY (Preview)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: "LOVE_ME_LIKE_YOU_DO",
      name: "Love Me Like You Do – Ellie Goulding (Preview)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!connected) {
      setError("Please connect your TikTok Ads account.");
      return;
    }

    if (campaignName.length < 3) {
      setError("Campaign name must be at least 3 characters.");
      return;
    }

    if (!objective) {
      setError("Please select an objective.");
      return;
    }

    if (!musicOption) {
      setError("Please choose a music option.");
      return;
    }

    if (objective === "Conversions" && musicOption === "NONE") {
      setError("Music is required for Conversion campaigns.");
      return;
    }

    if (musicOption === "EXISTING" && !selectedSong) {
      setError("Please select an existing song.");
      return;
    }

    if (musicOption === "UPLOAD" && !uploadedSong) {
      setError("Please upload a music file.");
      return;
    }

    setSuccess("🎉 Ad submitted successfully!");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>TikTok Ads Creative Flow</h1>

        <button style={styles.connectBtn} onClick={() => setConnected(true)}>
          {connected ? "Connected ✅" : "Connect TikTok Ads Account"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />

          <select
            style={styles.input}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          >
            <option value="">Select Objective</option>
            <option value="Traffic">Traffic</option>
            <option value="Conversions">Conversions</option>
          </select>

          <h3>Music Options</h3>

          {/* EXISTING MUSIC */}
          <label>
            <input
              type="radio"
              name="music"
              onChange={() => {
                setMusicOption("EXISTING");
                setUploadedSong(null);
              }}
            /> Existing Music
          </label>

          {musicOption === "EXISTING" &&
            songs.map((song) => (
              <div key={song.id} style={styles.songBox}>
                <input
                  type="radio"
                  name="song"
                  onChange={() => setSelectedSong(song)}
                />
                <strong>{song.name}</strong>
                <audio controls style={{ width: "100%" }}>
                  <source src={song.url} type="audio/mpeg" />
                </audio>
              </div>
            ))}

          {/* UPLOAD MUSIC */}
          <label>
            <input
              type="radio"
              name="music"
              onChange={() => {
                setMusicOption("UPLOAD");
                setSelectedSong(null);
              }}
            /> Upload Music
          </label>

          {musicOption === "UPLOAD" && (
            <div style={styles.songBox}>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  setUploadedSong(URL.createObjectURL(e.target.files[0]))
                }
              />
              {uploadedSong && (
                <audio controls style={{ width: "100%", marginTop: "10px" }}>
                  <source src={uploadedSong} />
                </audio>
              )}
            </div>
          )}

          {/* NO MUSIC */}
          <label>
            <input
              type="radio"
              name="music"
              onChange={() => {
                setMusicOption("NONE");
                setSelectedSong(null);
                setUploadedSong(null);
              }}
            /> No Music
          </label>

          <button style={styles.submitBtn} type="submit">
            Submit Ad
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #000000, #fe2c55)"
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    width: "420px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  title: {
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px"
  },
  connectBtn: {
    width: "100%",
    padding: "10px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginBottom: "15px",
    cursor: "pointer"
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#fe2c55",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "15px",
    cursor: "pointer"
  },
  songBox: {
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px"
  },
  error: {
    background: "#ffe5e5",
    color: "#b00020",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px"
  },
  success: {
    background: "#e6fffa",
    color: "#00695c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px"
  }
};

export default App;
