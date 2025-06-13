const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

export async function signInStrapi({ identifier, password }: { identifier: string; password: string }) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Sign in failed");
  }
  return data; // contains jwt and user
}

export async function signUpStrapi({ username, email, password, education }: { username: string; email: string; password: string; education?: string }) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password /*, education */ }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Sign up failed");
  }
  return data; // contains jwt and user
}

export async function getCoursesStrapi(jwt: string) {
  const res = await fetch(`${STRAPI_URL}/api/courses`, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch courses")
  }
  const data = await res.json()
  return data.data
}

export async function activateCourseCodeStrapi(code: string, jwt: string) {
  const res = await fetch(`${STRAPI_URL}/api/activation-codes/activate?code=${encodeURIComponent(code)}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || "Activation failed")
  }
  return data
}

export async function getLecturesByCourseStrapi(courseId: string, jwt: string) {
  const url = `${STRAPI_URL}/api/lectures?course=${courseId}`
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch lectures")
  }
  const data = await res.json()
  return data.data
}

export async function getLectureByDocumentIdStrapi(documentId: string, jwt: string) {
  const url = `${STRAPI_URL}/api/lectures/${documentId}`
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch lecture")
  }
  const data = await res.json()
  return data.data
}

export async function markLectureProgressStrapi(lectureDocumentId: string, jwt: string) {
  const res = await fetch(`${STRAPI_URL}/api/progresses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: { lectureDocumentId }}),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || "Failed to mark progress")
  }
  return data
} 