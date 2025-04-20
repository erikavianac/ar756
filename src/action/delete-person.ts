"use server";

export async function deletePersonActionServer(personId: string) {
  const deletedPerson = await fetch(
    `${process.env.SERVER_URL}/person/delete/${personId}`,
    {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return deletedPerson;
}
