import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    licence: false
  });

  const qualities = useSelector(getQualities());
  const professions = useSelector(getProfessions());
  const [errors, setErrors] = useState({});

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Некорректный email"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 2 символов",
        value: 2
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

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label };
  //     }
  //   }
  // };
  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите свою профессию"
        defaultOption="Choose..."
        name="profession"
        options={professionsList}
        value={data.profession}
        onChange={handleChange}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Муж", value: "male" },
          { name: "Жен", value: "female" },
          { name: "Другое", value: "other" }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultySelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши касчества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное cоглашение</a>
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Войти
      </button>
    </form>
  );
};

export default RegisterForm;
