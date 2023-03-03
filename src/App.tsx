import axios from "axios";
import { useState } from "react";
import { saveAs } from "file-saver";
import Progress from "./components/Progress";
import ErrorMessage from "./components/ErrorMessage";

function App() {
    const [sid, setSid] = useState("");
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

    async function getBuffer() {
        setError(false);
        try {
            const { data }: { data: ArrayBuffer } = await axios.get(
                `https://resumeiopdf-backend.onrender.com/${sid}`,
                {
                    responseType: "arraybuffer",
                    onDownloadProgress: (progEvent) => {
                        const perc = Math.round(
                            (progEvent.loaded * 100) / progEvent.total!,
                        );
                        setProgress(perc);
                    },
                },
            );

            const blob = new Blob([data]);
            saveAs(blob, `${sid}.pdf`);
        } catch (error) {
            setError(true);
        }
    }

    return (
        <div className="App w-screen h-screen grid place-content-center gap-12">
            <div className="card prose ">
                <label htmlFor="sid" className="label ">
                    <span>Resume ID:</span>
                </label>
                <input
                    required
                    className="input input-primary"
                    type="text"
                    name="sid"
                    id="sid"
                    onChange={(e) => {
                        setSid(e.target.value);
                    }}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                    getBuffer();
                }}
            >
                PDF
            </button>
            <div className="flex justify-center">
                {progress !== 0 && !error && <Progress value={progress} />}
                {error && <ErrorMessage />}
            </div>
        </div>
    );
}

export default App;
