import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: {},
  });

  function handleAddTask(text, projectId) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: projectId,
        id: taskId,
      };

      const updatedTasks = {
        ...prevState.tasks,
        [projectId]: [...(prevState.tasks[projectId] || []), newTask],
      };

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  const handleDeleteTask = (id) => {
    setProjectsState((prevState) => {
      const updatedTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: prevState.tasks[
          prevState.selectedProjectId
        ].filter((task) => task.id !== id),
      };

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  };

  const handleStartAddingProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const handleCancelCreationProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  // There is Selected Project displayed
  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks[selectedProject?.id] || []}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelCreationProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected onStartAddProject={handleStartAddingProject} />
    );
  }

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddingProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />

      {content}
    </main>
  );
}

export default App;
