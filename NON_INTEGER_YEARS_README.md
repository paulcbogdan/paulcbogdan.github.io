# Non-Integer Publication Years Setup

This setup allows you to add bibliography entries with non-integer publication statuses like "in press", "in preparation", etc., and have them appear at the top of your publications list.

## How to Add Non-Integer Publication Entries

### 1. In your `_bibliography/papers.bib` file:

Use special numeric year values and add a `note` field with the actual status:

```bibtex
@article{your_paper_key,
  title={Your Paper Title},
  author={Your Name},
  journal={Journal Name},
  year={9999},  % Special numeric code for sorting
  note={in press}  % Actual status to display
}
```

### 2. Supported Publication Statuses

| Status | Year Code | Note Field |
|--------|-----------|------------|
| in press | 9999 | `in press` |
| in preparation | 9998 | `in preparation` |
| submitted | 9997 | `submitted` |
| under review | 9996 | `under review` |

### 3. Example Entries

```bibtex
% In Press
@article{paper_in_press,
  title={Paper Currently in Press},
  author={Author Name},
  journal={Journal Name},
  year={9999},
  note={in press},
  pdf={path/to/pdf.pdf}
}

% In Preparation
@article{paper_in_prep,
  title={Paper in Preparation},
  author={Author Name},
  journal={Future Journal},
  year={9998},
  note={in preparation}
}

% Submitted
@article{paper_submitted,
  title={Submitted Paper},
  author={Author Name},
  journal={Target Journal},
  year={9997},
  note={submitted}
}
```

## How It Works

1. **Sorting**: The special year codes (9999, 9998, etc.) ensure non-integer entries appear at the top when sorted in descending order
2. **Display**: The bibliography template (`_layouts/bib.liquid`) detects these special year codes and displays the `note` field instead of the numeric year
3. **Grouping**: Jekyll Scholar groups by the numeric year values, so all "in press" papers appear together under one heading

## Files Modified

- `_bibliography/papers.bib` - Added year codes and note fields
- `_layouts/bib.liquid` - Modified year display logic to show note field for special year codes

## Adding New Publication Statuses

To add new publication statuses:

1. Choose an unused year code (e.g., 9995)
2. Add the case to `_layouts/bib.liquid` in the year display section
3. Use the year code and note field in your bibliography entries

This system maintains compatibility with regular numeric years while providing flexibility for non-integer publication statuses. 