import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const Captcha = ({ onValidate }) => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        drawCaptcha();
    }, [captcha]);

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.font = "30px Arial";
            ctx.fillStyle = "#333";
            ctx.fillText(captcha, 10, 35);

            // Add some distortion lines to make it more secure
            ctx.strokeStyle = "#999";
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
        }
    };

    const handleValidate = () => {
        if (userInput.toUpperCase() === captcha) {
            setError(false);
            onValidate(true);
        } else {
            setError(true);
            onValidate(false);
        }
    };

    const handleRefresh = () => {
        const newCaptcha = generateCaptcha();
        setCaptcha(newCaptcha);
        setUserInput("");
        setError(false);
    };

    return (
        <Box sx={{ marginY: 2 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginY: 2 }}>
                <canvas ref={canvasRef} width={150} height={50} style={{ border: "1px solid #ccc" }} />
                <Button onClick={handleRefresh} variant="contained" color="warning">
                    <RefreshIcon />
                </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    variant="outlined"
                    placeholder="Enter CAPTCHA"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    error={error}
                    helperText={error ? "Incorrect CAPTCHA" : ""}
                    sx={{ width: "50%" }}
                />
                <Button onClick={handleValidate} variant="contained" color="warning">
                    Validate
                </Button>
            </Box>
        </Box>
    );
};

export default Captcha;
