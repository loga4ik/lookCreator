import { UserType } from "../store/user.store";

export const logInUser = async (
  login: string,
  password: string,
): Promise<UserType | Error> => {
  try {
    const response = await fetch("api/user/login", {
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
  login: string,
  name: string,
  surname: string,
  patronymic: string,
  email: string,
  phone: string,
  password: string,
): Promise<UserType | Error> => {
  try {
    const response = await fetch("api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        name,
        surname,
        patronymic,
        email,
        phone,
        password,
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
