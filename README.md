# Advanced Todo Management System

## Build a scalable, clean Todo application using React

Mandatory Features
Todo CRUD - Add a todo - Edit a todo - Delete a todo - Mark todo as completed / incomplete

Each todo must hav
{
id: string,
title: string,
description?: string,
status: "pending" | "completed",
priority: "low" | "medium" | "high",
createdAt: timestamp
}

Filtering

- Status (All / Completed / Pending)
- Priority

Persistence

- Store todos in localStorage
- Restore todos on page refresh
- Clear todos button

UX & Edge Cases

- Disable add button if title is empty
- Trim whitespace
- Confirm before delete
