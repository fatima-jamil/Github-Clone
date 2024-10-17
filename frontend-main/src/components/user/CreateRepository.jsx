import React, { useState } from "react";
import { PageHeader, Box, Button, TextInput, FormControl, Checkbox } from "@primer/react";
import "./createRepository.css";

const CreateRepository = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [hasReadme, setHasReadme] = useState(false);
  const [hasGitIgnore, setHasGitIgnore] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRepository = async () => {
    setIsCreating(true);
    // Logic for creating a repository with entered details.
    console.log({
      repoName,
      description,
      isPrivate,
      hasReadme,
      hasGitIgnore,
    });
    setIsCreating(false);
    alert("Repository created successfully!");
  };

  return (
    <div className="create-repo-wrapper">
      <div className="repo-header-container">
        <Box sx={{ padding: 3 }}>
          <PageHeader>
            <PageHeader.TitleArea variant="large">
              <PageHeader.Title>Create a new repository</PageHeader.Title>
              <PageHeader.Description>
                A repository contains all project files, including the revision history.
              </PageHeader.Description>
            </PageHeader.TitleArea>
          </PageHeader>
        </Box>
      </div>

      <div className="repo-form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl>
            <FormControl.Label>Repository name</FormControl.Label>
            <TextInput
              name="repoName"
              placeholder="Repository name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="repo-input"
              required
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Description (optional)</FormControl.Label>
            <TextInput
              name="description"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="repo-input"
            />
          </FormControl>

          <FormControl>
            <Checkbox
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            <FormControl.Label className="repo-checkbox-label">
              Private
            </FormControl.Label>
            <p className="repo-checkbox-description">
              When a repository is private, you choose who can see and commit to it.
            </p>
          </FormControl>

          <div className="repo-options">
            <FormControl>
              <Checkbox
                checked={hasReadme}
                onChange={() => setHasReadme(!hasReadme)}
              />
              <FormControl.Label className="repo-checkbox-label">
                Add a README file
              </FormControl.Label>
              <p className="repo-checkbox-description">
                This will add a README file with basic information about the repository.
              </p>
            </FormControl>

            <FormControl>
              <Checkbox
                checked={hasGitIgnore}
                onChange={() => setHasGitIgnore(!hasGitIgnore)}
              />
              <FormControl.Label className="repo-checkbox-label">
                Add .gitignore
              </FormControl.Label>
              <p className="repo-checkbox-description">
                Choose which files should be ignored in version control.
              </p>
            </FormControl>
          </div>

          <Button
            variant="primary"
            onClick={handleCreateRepository}
            disabled={isCreating}
            className="repo-create-button"
          >
            {isCreating ? "Creating..." : "Create Repository"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRepository;
