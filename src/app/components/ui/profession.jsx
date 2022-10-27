import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
  const professions = useSelector(getProfessions());
  const professionName = (professions.filter((p) => p._id === id))[0].name;
  const isLoading = useSelector(getProfessionsLoadingStatus());
  if (!isLoading) {
    return <p>{professionName}</p>;
  } else return "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
