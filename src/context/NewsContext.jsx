import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const NewsContext = createContext({
  newsData: [],
  handleAddNews: async () => {},
  handleEditNews: async () => {},
  handleDeleteNews: async () => {},
  categories: [],
  loading: false,
  newsById: [],
});

export const NewsContextProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newsById, setNewsById] = useState([]);
  const token = localStorage.getItem('ACCOUNT_TOKEN');

  const userData = JSON.parse(localStorage.getItem('ACCOUNT_DATA'));

  const navigate = useNavigate();

  const { id } = useParams();

  const getAllNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/news`);
      const data = await response.json();
      if (response.ok) {
        setNewsData(data.data);
      } else {
        console.error('error');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const handleAddNews = async (title, description, fileUrl, categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/news`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          image: fileUrl,
          userId: userData.id,
          categoryId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await getAllNews();
        navigate('/news');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getNewsByID = async () => {
      try {
        if (id) {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/news/${id}`);
          const responseJson = await response.json();
          setNewsById(responseJson.data);
        } else {
          console.error('no id');
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getNewsByID();
  }, [id]);

  const handleEditNews = async (title, description, fileUrl, categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/news/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description,
          image: fileUrl,
          userId: userData.id,
          categoryId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await getAllNews();
        navigate('/news');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`);
        if (response.ok) {
          const responseJson = await response.json();
          setCategories(responseJson.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleDeleteNews = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success('Successfully deleted');
        await getAllNews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <NewsContext.Provider value={{ newsData, handleAddNews, categories, loading, newsById, handleEditNews, handleDeleteNews }}>{children}</NewsContext.Provider>;
};

NewsContextProvider.propTypes = {
  children: PropTypes.node,
};
