"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const expenses_1 = __importDefault(require("./routes/expenses"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const goals_1 = __importDefault(require("./routes/goals"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// simple health route
app.get('/health', (_req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    // const state = states[mongoose.connection.readyState] ?? 'unknown';
    const state = states[mongoose_1.default.connection.readyState] ?? "unknown";
    res.json({ ok: true, db: state });
});
// Routes
app.use('/auth', auth_1.default);
app.use("/expenses", expenses_1.default);
app.use("/budgets", budgets_1.default);
app.use("/goals", goals_1.default);
app.use("/analytics", analytics_1.default);
const PORT = process.env.PORT || 8080;
async function start() {
    const uri = process.env.MONGO_URI;
    if (uri) {
        try {
            await mongoose_1.default.connect(uri);
            console.log('Mongo connected');
        }
        catch (err) {
            console.error('Mongo connection failed:', err.message);
        }
    }
    else {
        console.warn('⚠️  MONGO_URI not set — running without DB for now');
    }
    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
}
start();
