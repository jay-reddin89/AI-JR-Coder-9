---
name: agent-organization-expert
description: Multi-agent orchestration skill for team assembly, task decomposition, workflow optimization, and coordination strategies to achieve optimal team performance and resource utilization.
---

# Agent Organization

Assemble and coordinate multi-agent teams through systematic task analysis, capability mapping, and workflow design.

## When to use

- Decomposing complex tasks into subtasks for parallel execution
- Assembling teams of specialized agents for multi-domain problems
- Designing workflows with dependencies and checkpoints
- Optimizing resource utilization across agent teams
- Coordinating concurrent agent execution

## When NOT to use

- For simple single-agent tasks (use the appropriate mode directly)
- For debugging existing code (use debug mode instead)
- For security audits (use security-auditor instead)

## Inputs required

- Task description and scope
- Available agent capabilities
- Constraints (time, resources, dependencies)
- Success criteria

## Workflow

1. **Analyze requirements**
   - Understand task scope and constraints
   - Define success criteria
   - Identify input/output requirements

2. **Decompose task**
   - Break into discrete subtasks
   - Map dependencies between subtasks
   - Estimate complexity per component

3. **Assemble team**
   - Match agents to required skills
   - Balance workload across team
   - Define roles and ownership

4. **Design workflow**
   - Choose orchestration pattern (sequential/parallel/pipeline)
   - Define checkpoints and sync points
   - Plan error handling and recovery

5. **Execute and monitor**
   - Coordinate agent execution
   - Track progress and performance
   - Adapt based on feedback

## Orchestration Patterns

| Pattern | Use When | Concurrency |
|---------|----------|-------------|
| Sequential | Strict ordering required | 1 |
| Parallel | Independent tasks | Up to max concurrency |
| Pipeline | Streaming/continuous processing | Stages concurrent |
| Hierarchical | Complex multi-domain tasks | Sub-teams parallel |
| Map-Reduce | Large-scale data processing | Distributed |

## Configuration Variables

- `${agent_count}` - Number of agents in team (default: 3)
- `${max_concurrency}` - Maximum parallel tasks (default: 5)
- `${timeout_seconds}` - Task timeout threshold (default: 300)
- `${retry_count}` - Max retry attempts (default: 3)

## Examples

### Task decomposition

```
Complex Task: Build e-commerce website
├── Frontend (React agent)
├── Backend API (Node.js agent)
├── Database schema (SQL agent)
└── Integration testing (QA agent)
```

### Sequential workflow

```
1. Design database schema
2. Implement backend API (depends on 1)
3. Build frontend (depends on 2)
4. Deploy (depends on 3)
```

### Parallel workflow

```
1. Design UI mockups ──┐
2. Set up database ────┼──> 3. Integrate components
3. Configure CI/CD ────┘
```

## Best Practices

- Start with minimal viable team, scale based on needs
- Define clear ownership and accountability per agent
- Include checkpoints for validation and rollback
- Plan for failure scenarios with backup agents
- Monitor utilization and rebalance dynamically
