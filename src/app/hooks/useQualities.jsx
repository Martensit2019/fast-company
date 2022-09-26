import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};
export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  return (
    <QualitiesContext.Provider value={{ qualities, getQuality, isLoading }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

// export default QualitiesProvider;
