const { put, get } = require('@vercel/blob');

const BLOB_FILENAME = 'state.json';

function setCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

async function getStoredData(token) {
    try {
        const result = await get(BLOB_FILENAME, { access: 'private', token });
        if (!result) return null;
        const text = await new Response(result.stream).text();
        return JSON.parse(text);
    } catch (e) {
        return null;
    }
}

async function saveStoredData(data, token) {
    data.updatedAt = Date.now();
    await put(BLOB_FILENAME, JSON.stringify(data), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        token: token
    });
    return data;
}

module.exports = async (req, res) => {
    setCors(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
        return res.status(500).json({ success: false, error: 'Missing BLOB_READ_WRITE_TOKEN configuration' });
    }

    try {
        let currentData = await getStoredData(token) || {
            courses: {},
            lastState: null,
            updatedAt: 0
        };
        if (!currentData.courses) currentData.courses = {};

        if (req.method === 'GET') {
            return res.status(200).json({ success: true, data: currentData });
        }

        if (req.method === 'POST') {
            let body = req.body;
            if (typeof body === 'string') {
                try { body = JSON.parse(body); } catch(e) {}
            }
            if (!body) body = {};

            const type = body.type || 'sync';

            if (type === 'toggle_star') {
                const { courseKey, exerciseId, starred } = body;
                if (courseKey && exerciseId) {
                    if (!currentData.courses[courseKey]) currentData.courses[courseKey] = { starred: [], completed: [], completedTheory: [] };
                    let st = currentData.courses[courseKey].starred || [];
                    if (starred) {
                        if (!st.includes(exerciseId)) st.push(exerciseId);
                    } else {
                        st = st.filter(id => id !== exerciseId);
                    }
                    currentData.courses[courseKey].starred = st;
                }
            } else if (type === 'toggle_complete') {
                const { courseKey, exerciseId, completed } = body;
                if (courseKey && exerciseId) {
                    if (!currentData.courses[courseKey]) currentData.courses[courseKey] = { starred: [], completed: [], completedTheory: [] };
                    let comp = currentData.courses[courseKey].completed || [];
                    if (completed) {
                        if (!comp.includes(exerciseId)) comp.push(exerciseId);
                    } else {
                        comp = comp.filter(id => id !== exerciseId);
                    }
                    currentData.courses[courseKey].completed = comp;
                }
            } else if (type === 'set_theory_done') {
                const { courseKey, moduleKey, done } = body;
                if (courseKey && moduleKey) {
                    if (!currentData.courses[courseKey]) currentData.courses[courseKey] = { starred: [], completed: [], completedTheory: [] };
                    let th = currentData.courses[courseKey].completedTheory || [];
                    if (done) {
                        if (!th.includes(moduleKey)) th.push(moduleKey);
                    } else {
                        th = th.filter(id => id !== moduleKey);
                    }
                    currentData.courses[courseKey].completedTheory = th;
                }
            } else {
                // General state merge
                const incomingCourses = (body.state && body.state.courses) || body.courses || {};
                for (const cKey in incomingCourses) {
                    if (!currentData.courses[cKey]) currentData.courses[cKey] = { starred: [], completed: [], completedTheory: [] };
                    const inc = incomingCourses[cKey];

                    // Merge starred
                    if (Array.isArray(inc.starred)) {
                        const existing = new Set(currentData.courses[cKey].starred || []);
                        inc.starred.forEach(id => existing.add(id));
                        currentData.courses[cKey].starred = Array.from(existing);
                    }

                    // Merge completed
                    if (Array.isArray(inc.completed)) {
                        const existing = new Set(currentData.courses[cKey].completed || []);
                        inc.completed.forEach(id => existing.add(id));
                        currentData.courses[cKey].completed = Array.from(existing);
                    }

                    // Merge completedTheory
                    if (Array.isArray(inc.completedTheory)) {
                        const existing = new Set(currentData.courses[cKey].completedTheory || []);
                        inc.completedTheory.forEach(id => existing.add(id));
                        currentData.courses[cKey].completedTheory = Array.from(existing);
                    }
                }

                if (body.lastState) {
                    currentData.lastState = body.lastState;
                }
            }

            const saved = await saveStoredData(currentData, token);
            return res.status(200).json({ success: true, data: saved });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (err) {
        console.error('Sync API Error:', err);
        return res.status(500).json({ success: false, error: err.message || 'Internal error' });
    }
};
