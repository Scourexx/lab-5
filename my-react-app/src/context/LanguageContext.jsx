import { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  en: {
    common: {
      appName: 'TaskMaster',
      dashboard: 'Dashboard',
      settings: 'Settings',
      logout: 'Logout',
      backToDashboard: 'Back to Dashboard',
      notFound: 'Not Found',
    },
    auth: {
      login: 'Log In',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
    },
    dashboard: {
      title: 'Project Dashboard',
      projects: 'Projects',
      statistics: 'Statistics',
      tasks: 'Tasks',
    },
    projects: {
      status: {
        all: 'All Statuses',
        active: 'Active',
        completed: 'Completed',
        planned: 'Planned',
      },
      priority: {
        all: 'All Priorities',
        low: 'Low',
        medium: 'Medium',
        high: 'High',
      },
      actions: {
        add: 'Add Project',
        edit: 'Edit Project',
        delete: 'Delete Project',
      },
      form: {
        name: 'Project Name',
        description: 'Description',
        status: 'Status',
        priority: 'Priority',
        dates: 'Project Dates',
        startDate: 'Start Date',
        endDate: 'End Date',
        submit: 'Save Project',
        cancel: 'Cancel',
      },
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      empty: 'No projects found',
      notFound: 'Project not found',
      addSuccess: 'Project added successfully',
      updateSuccess: 'Project updated successfully',
      deleteSuccess: 'Project deleted successfully',
      deleteError: 'Failed to delete project',
    },
    tasks: {
      add: 'Add Task',
      edit: 'Edit Task',
      delete: 'Delete Task',
      title: 'Title',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      assignedTo: 'Assigned To',
      dueDate: 'Due Date',
      submit: 'Save Task',
      cancel: 'Cancel',
      notFound: 'No tasks found',
      deleteSuccess: 'Task deleted successfully',
      updateSuccess: 'Task updated successfully',
      addSuccess: 'Task added successfully',
    },
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      theme: 'Theme',
      language: 'Language',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      saveChanges: 'Save Changes',
      saveSuccess: 'Settings saved successfully',
    },
    deleteConfirm: 'Are you sure you want to delete this?',
  },
  ru: {
    common: {
      appName: 'ЗадачаМастер',
      dashboard: 'Панель управления',
      settings: 'Настройки',
      logout: 'Выйти',
      backToDashboard: 'Назад к панели управления',
      notFound: 'Не найдено',
    },
    auth: {
      login: 'Войти',
      register: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      forgotPassword: 'Забыли пароль?',
    },
    dashboard: {
      title: 'Панель проектов',
      projects: 'Проекты',
      statistics: 'Статистика',
      tasks: 'Задачи',
    },
    projects: {
      status: {
        all: 'Все статусы',
        active: 'Активные',
        completed: 'Завершенные',
        planned: 'Планируемые',
      },
      priority: {
        all: 'Все приоритеты',
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
      },
      actions: {
        add: 'Добавить проект',
        edit: 'Редактировать проект',
        delete: 'Удалить проект',
      },
      form: {
        name: 'Название проекта',
        description: 'Описание',
        status: 'Статус',
        priority: 'Приоритет',
        dates: 'Даты проекта',
        startDate: 'Дата начала',
        endDate: 'Дата окончания',
        submit: 'Сохранить проект',
        cancel: 'Отмена',
      },
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      empty: 'Проекты не найдены',
      notFound: 'Проект не найден',
      addSuccess: 'Проект успешно добавлен',
      updateSuccess: 'Проект успешно обновлен',
      deleteSuccess: 'Проект успешно удален',
      deleteError: 'Не удалось удалить проект',
    },
    tasks: {
      add: 'Добавить задачу',
      edit: 'Редактировать задачу',
      delete: 'Удалить задачу',
      title: 'Заголовок',
      description: 'Описание',
      status: 'Статус',
      priority: 'Приоритет',
      assignedTo: 'Назначено',
      dueDate: 'Срок',
      submit: 'Сохранить задачу',
      cancel: 'Отмена',
      notFound: 'Задачи не найдены',
      deleteSuccess: 'Задача успешно удалена',
      updateSuccess: 'Задача успешно обновлена',
      addSuccess: 'Задача успешно добавлена',
    },
    settings: {
      title: 'Настройки',
      appearance: 'Внешний вид',
      theme: 'Тема',
      language: 'Язык',
      lightMode: 'Светлая тема',
      darkMode: 'Темная тема',
      saveChanges: 'Сохранить изменения',
      saveSuccess: 'Настройки успешно сохранены',
    },
    deleteConfirm: 'Вы уверены, что хотите удалить это?',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });
  
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (!result) return key;
      result = result[k];
    }
    
    return result || key;
  };
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 