import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import MultySelectField from "../../common/form/multySelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof];
      if (profData._id === id) return profData;
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem in elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log(data);
  };

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    );
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   api.users.getById(userId).then(({ profession, qualities, ...data }) =>
  //     setData((prevState) => ({
  //       ...prevState,
  //       ...data,
  //       qualities: transformData(qualities),
  //       profession: profession._id
  //     }))
  //   );
  //   api.professions.fetchAll().then((data) => {
  //     const professionsList = Object.keys(data).map((professionName) => ({
  //       label: data[professionName].name,
  //       value: data[professionName]._id
  //     }));
  //     setProfession(professionsList);
  //   });
  //   api.qualities.fetchAll().then((data) => {
  //     const qualitiesList = Object.keys(data).map((optionName) => ({
  //       value: data[optionName]._id,
  //       label: data[optionName].name,
  //       color: data[optionName].color
  //     }));
  //     setQualities(qualitiesList);
  //   });
  // }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Некорректный email"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите Вашу профессию"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
              />
              <MultySelectField
                defaultValue={data.qualities}
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите Ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
