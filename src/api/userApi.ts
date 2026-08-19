import { UserType } from "../store/user.store";

type RegFormData = {
  login: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  imgLink: string | null;
};

export const logInUser = async (
  login: string,
  password: string,
): Promise<UserType | Error> => {
  try {
    const response = await fetch("api/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }
    const res: UserType = await response.json();
    console.log(res);

    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};

export const RegUser = async (
  formData: RegFormData,
): Promise<UserType | Error> => {
  try {
    console.log(formData);

    const response = await fetch("api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: formData.login,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        imgLink: formData.imgLink,
      }),
    });

    if (!response.ok) {
      return new Error("Ошибка запроса");
    }
    const res: UserType = await response.json();
    console.log(res);

    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};

export const isExistUser = async (
  login: string | null,
  email: string | null,
): Promise<boolean | Error> => {
  try {
    const response = await fetch("api/user/exist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        email,
      }),
    });

    if (!response.ok) {
      return new Error(`Ошибка запроса: ${await response.text()}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return new Error("Ошибка запроса: " + error);
  }
};

export const logOutUser = async (): Promise<true | Error> => {
  const response = await fetch("api/user/logout", {
    method: "POST",
  });
  return response.ok
    ? true
    : new Error(`Ошибка запроса: ${await response.text()}`);
};

export const authByToken = async (): Promise<UserType | Error> => {
  const response = await fetch("api/user/me", {
    method: "GET",
  });

  if (!response.ok) {
    return new Error(`Ошибка запроса: ${await response.text()}`);
  }
  return await response.json();
};
