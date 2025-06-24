const API_BASE = "http://localhost:8000/api/hotels/";

export async function createHotel(data, token) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateHotel(id, data, token) {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function publishHotel(id, token) {
  const res = await fetch(`${API_BASE}${id}/publish/`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.json();
}

export async function getOwnerHotels(token) {
  const res = await fetch(API_BASE, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function getPublicHotels() {
  const res = await fetch(`${API_BASE}public/`);
  return res.json();
}

export async function previewHotel(id, token) {
  const res = await fetch(`${API_BASE}${id}/preview/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function deleteHotel(id, token) {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Token ${token}` },
  });
  return res;
}