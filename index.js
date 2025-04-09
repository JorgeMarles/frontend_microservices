// mock-server.ts
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let contests = [
  {
    id: 1,
    name: "Mock Contest 1",
    description: "This is a test contest.",
    start: new Date(),
    duration: 120,
    enroll: false,
  },
  {
    id: 2,
    name: "Mock Contest 2",
    description: "Another test contest.",
    start: new Date(),
    duration: 90,
    enroll: true,
  },
];

let rankings = {
  1: {
    user: 1,
    problemsSolved: 2,
    penalty: 15,
    submissions: [
      { attempts: 2, solved: true, time: 30 },
      { attempts: 1, solved: true, time: 45 },
    ],
  },
};

// GET /contest
app.get("/contest", (req, res) => {
  const query = req.query.q;
  if (query) {
    const filtered = contests.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(contests);
  }
});

// GET /contest/:id
app.get("/contest/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contest = contests.find((c) => c.id === id);
  if (!contest) return res.status(404).json({ message: "Contest not found" });

  res.json({
    ...contest,
    problems: [
      { id: 1, name: "Problem A" },
      { id: 2, name: "Problem B" },
    ],
  });
});

// POST /contest
app.post("/contest", (req, res) => {
  const newContest = {
    ...req.body,
    id: contests.length + 1,
    enroll: req.body.enroll ?? false,
  };
  contests.push(newContest);
  res.status(201).json(newContest);
});

// PUT /contest
app.put("/contest", (req, res) => {
  const updated = req.body;
  const index = contests.findIndex((c) => c.id === updated.id);
  if (index === -1) return res.status(404).json({ message: "Contest not found" });

  contests[index] = { ...updated };
  res.json(updated);
});

// DELETE /contest/:id
app.delete("/contest/:id", (req, res) => {
  const id = parseInt(req.params.id);
  contests = contests.filter((c) => c.id !== id);
  res.json({ message: "Contest deleted" });
});

// GET /contest/:id/ranking
app.get("/contest/:id/ranking", (req, res) => {
  const id = parseInt(req.params.id);
  const ranking = rankings[id];
  if (!ranking) return res.status(404).json({ message: "Ranking not found" });
  res.json(ranking);
});

// POST /contest/:id/enroll
app.post("/contest/:id/enroll", (req, res) => {
  const id = parseInt(req.params.id);
  const contest = contests.find((c) => c.id === id);
  if (!contest) return res.status(404).json({ message: "Contest not found" });

  contest.enroll = true;
  res.json({ message: `Enrolled in contest ${id}` });
});

// DELETE /contest/:id/enroll
app.delete("/contest/:id/enroll", (req, res) => {
  const id = parseInt(req.params.id);
  const contest = contests.find((c) => c.id === id);
  if (!contest) return res.status(404).json({ message: "Contest not found" });

  contest.enroll = false;
  res.json({ message: `Unenrolled from contest ${id}` });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

