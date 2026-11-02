# Voltrama Studio

Voltrama Studio is an open-source foundation for electronic engineering workflows: projects, documentation, component knowledge and future integrations with established EDA tools.

> **Current stage:** M0-001 provides a navigable interface and initial architecture. A circuit editor, electrical simulator and artifact generation are not implemented on `main`.

## What is implemented

- Responsive static interface in HTML, CSS and JavaScript with no external runtime dependencies.
- Hash-based navigation between overview, workspace, library and community views.
- Original visual system based on circuit traces and connection nodes.
- Documented integration contracts for KiCad, ngspice and designElectronics.

## Run and test

Open `src/index.html` in a modern browser, or serve `src/` with a static HTTP server. For the repository checks:

```powershell
python -m unittest discover -s tests -v
```

The `main` instructions describe the stable public foundation. Development branches and open PRs may contain staged or dependent work and should not be treated as an integrated release.

## Not implemented on main

- Electrical schematic editing.
- Electrical simulation.
- Authenticated private-project workflows.
- Generated manufacturing artifacts.

These items are tracked as development or future work, not as current product capabilities.

## Documentation and license

See [DECISIONS.md](DECISIONS.md), [INTEGRATIONS.md](INTEGRATIONS.md), [ROADMAP.md](ROADMAP.md) and [tests](tests/). Voltrama Studio is licensed under the [MIT License](LICENSE).

[Leia em português](README.md).
