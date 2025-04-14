import { useMemo } from 'react';

const useFilteredProjects = (projects, filters) => {
  const { status, priority, search } = filters;

  return useMemo(() => {
    return projects.filter(project => {
      // Status filter
      if (status !== 'all' && project.status !== status) {
        return false;
      }

      // Priority filter
      if (priority !== 'all' && project.priority !== priority) {
        return false;
      }

      // Search filter (case-insensitive)
      if (
        search &&
        !project.name.toLowerCase().includes(search.toLowerCase()) &&
        !project.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [projects, status, priority, search]);
};

export default useFilteredProjects; 