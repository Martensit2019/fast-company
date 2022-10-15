import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import MultySelectField from "../../common/form/multySelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import BackHistoryButton from "../../common/form/backButtton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { getUserById } = useUser();
  const { currentUser, updateUserData } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const { professions, isLoading: profLoading } = useProfessions();
  const { qualities, getQuality, isLoading: qualLoading } = useQualities();
  const [errors, setErrors] = useState({});

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const updateData = {
      ...data,
      qualities: data.qualities.map((qual) => qual.value)
    };
    try {
      await updateUserData(updateData);
      history.goBack();
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (currentUser._id !== userId) {
      history.push(`/users/${currentUser._id}/edit`);
    }
    if (!profLoading && !qualLoading) {
      const user = getUserById(userId);
      setData((prevState) => ({
        ...prevState,
        ...user,
        qualities: user.qualities
          .map((qual) => getQuality(qual))
          .map((qual) => ({
            label: qual.name,
            value: qual._id
          }))
      }));
    }
  }, [profLoading, qualLoading, userId]);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Введите ваше имя"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Некорректный email"
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите Вашу профессию"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
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
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
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
                label="Выберите Ваш пол"
              />
              <MultySelectField
                defaultValue={data.qualities}
                options={qualitiesList}
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
