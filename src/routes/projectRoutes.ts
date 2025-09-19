import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import {
  hasAuthotization,
  taskBelonsToProject,
  taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router();
router.use(authenticate);

router.post(
  "/",
  body("projectName").notEmpty().withMessage("Name of the project is required"),
  body("clientName")
    .notEmpty()
    .withMessage("Name of the client of the project is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the project is required"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid Id"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.param("projectId", projectExists);

router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("Invalid Id"),
  body("projectName").notEmpty().withMessage("Name of the project is required"),
  body("clientName")
    .notEmpty()
    .withMessage("Name of the client of the project is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the project is required"),
  handleInputErrors,
  hasAuthotization,
  ProjectController.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("Invalid Id"),
  handleInputErrors,
  hasAuthotization,
  ProjectController.deleteProject
);

router.post(
  "/:projectId/tasks",
  hasAuthotization,
  body("name").notEmpty().withMessage("Name of the task is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the task is required"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTask);

router.param("taskId", taskExists);
router.param("taskId", taskBelonsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid Id"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  hasAuthotization,
  param("taskId").isMongoId().withMessage("Invalid Id"),
  body("name").notEmpty().withMessage("Name of the task is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the task is required"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthotization,
  param("taskId").isMongoId().withMessage("Invalid Id"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("Invalid Id"),
  body("status").notEmpty().withMessage("Status is required"),
  handleInputErrors,
  TaskController.updateStatus
);

router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("Invalid Email"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Invalid ID"),
  handleInputErrors,
  TeamMemberController.addMemberById
);

router.get("/:projectId/team", TeamMemberController.getProjectTeam);

router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("Invalid ID"),
  handleInputErrors,
  TeamMemberController.removeMemberById
);

router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content").notEmpty().withMessage("Note content is required"),
  handleInputErrors,
  NoteController.createNote
);

router.get("/:projectId/tasks/:taskId/notes", NoteController.getTaskNotes);

router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  param("noteId").isMongoId().withMessage("Invalid Id"),
  handleInputErrors,
  NoteController.deleteNote
);

export default router;
