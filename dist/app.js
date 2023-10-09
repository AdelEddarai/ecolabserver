"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.enable("trust proxy");
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
// Define your TURN server configuration here
const fallbackTurnServer = {
    iceServers: [
        {
            urls: 'stun:openrelay.metered.ca:80',
        },
        {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
        {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
        {
            urls: 'turn:openrelay.metered.ca:443?transport=tcp',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
    ],
};
app.get("/api/turn-server", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Return the TURN server configuration
    return res.status(200).json({ data: fallbackTurnServer });
}));
app.get("/api/get-avatar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    if (category !== "male" && category !== "female") {
        return res.status(400).json({
            error: `${category} is not a valid category. Input either male or female`,
        });
    }
    // Generate a random image URL based on the category (you'll need to implement this function)
    const randomImage = ""; // Implement this function to generate a random image URL
    return res.status(200).json({ data: `${baseUrl}/${randomImage}` });
}));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build", 'index.html'));
});
// Serve static files from directories
app.use(express_1.default.static("public"));
app.use("/images", express_1.default.static("images"));
app.use("/sounds", express_1.default.static("sounds"));
exports.default = app;
