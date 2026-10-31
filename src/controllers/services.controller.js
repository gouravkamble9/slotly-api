// FAKE in-memory database, replaced by PostgreSQL+Prisma in Phase 2.
// Every restart, this resets to these 2 items -
// exactly the problem a real database solves.
let services = [
  {
    id: '1',
    name: 'Doctor Consultation',
    description: 'General checkup with a doctor',
    price: 500,
    durationMinutes: 30,
  },
  {
    id: '2',
    name: 'Physiotherapy Session',
    description: 'One on one physiotherapy',
    price: 700,
    durationMinutes: 45,
  },
];
let nextId = 3;

// ---------------- READ: all services ----------------
export function getAllServices(req, res) {
  res.json({ success: true, data: services });
}

// ---------------- READ: one service by id ----------------
export function getServiceById(req, res) {
  // req.params holds values from the URL pattern. Requsting /services/5
  // makes req.params.id equal "5". NOTE: params are strings.
  const service = services.find((s) => s.id === req.params.id);

  if (!service) {
    // Early return pattern: handle the bad case and stop the handler.
    // Without `return`, the code continues and tries to answer twice -> crash.
    return res.status(404).json({
      success: false,
      message: 'Service not found',
    });
  }

  res.json({ success: true, data: service });
}

// ---------------- CREATE ----------------
export function createService(req, res) {
  // Destructure only the fields we expect from the request body
  const { name, description, price, durationMinutes } = req.body;

  // Manual validation for now (a proper validation library comes later).
  // Rule: `400` means "you sent me something invalid"
  if (!name || !price || !durationMinutes) {
    return res.status(400).json({
      success: false,
      message: 'name, price and durationMinutes are required',
    });
  }

  const newService = {
    id: String(nextId++),
    name,
    description: description || '',
    price,
    durationMinutes,
  };

  services.push(newService);

  // 201 is only used when something new was created
  res.status(201).json({ success: true, data: newService });
}

// ---------------- UPDATE (partial) ----------------
export function updateService(req, res) {
  const service = services.find((s) => s.id === req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found',
    });
  }

  // Allow-list: only these keys may ever be updated. Why not just
  // Object.assign(service, req.body)? Because a malicious client could then
  // send { "id": "999" } and corrupt our data. Never trust raw req.body.
  const allowed = ['name', 'description', 'price', 'durationMinutes'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) {
      service[field] = req.body[field];
    }
  });

  res.json({ success: true, data: service });
}

// ---------------- DELETE ----------------
export function deleteService(req, res) {
  const index = services.findIndex((s) => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Service not found',
    });
  }

  services.splice(index, 1);

  // 204 = success, and you MUST NOT send a body with it - that's what
  // "no content" means. This trips up beginners, so remember it.
  return res.status(204).send();
}