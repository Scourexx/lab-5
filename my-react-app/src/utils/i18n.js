import dayjs from 'dayjs';
import 'dayjs/locale/ru';

// Language options for the application
export const languages = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
];

// Full translations object (same as in LanguageContext)
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
  },
};

// Translation helper function
export const translate = (key, lang = 'en') => {
  if (!translations[lang]) {
    return key;
  }
  
  const keys = key.split('.');
  let result = translations[lang];
  
  for (const k of keys) {
    result = result[k];
    if (result === undefined) return key;
  }
  
  return result || key;
};

// Format date based on locale
export const formatDate = (dateString, lang = 'en') => {
  if (!dateString) return '';
  
  const date = dayjs(dateString);
  
  if (lang === 'ru') {
    dayjs.locale('ru');
    return date.format('DD MMMM YYYY');
  } else {
    dayjs.locale('en');
    return date.format('MMMM D, YYYY');
  }
};

// Get status options for dropdowns
export const getStatusOptions = (t) => [
  { value: 'planned', label: t('projects.status.planned') },
  { value: 'active', label: t('projects.status.active') },
  { value: 'completed', label: t('projects.status.completed') },
];

// Get priority options for dropdowns
export const getPriorityOptions = (t) => [
  { value: 'low', label: t('projects.priority.low') },
  { value: 'medium', label: t('projects.priority.medium') },
  { value: 'high', label: t('projects.priority.high') },
]; 