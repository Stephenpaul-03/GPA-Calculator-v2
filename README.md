# GPA Calculator v2

## Description

Welcome to **GPA Calculator v2** — MKII tool for calculating GPA or CGPA on a 10-point scale. Built using **React + Vite** with a sprinkle of **Chakra UI**, this version makes the process smoother than ever. You can manually input subject names, credits, and grades *or* use the **preset feature** to save time by selecting pre-configured college and department details.

This new version builds on the previous one [*more like a complete overhaul*] but packs even more convenience and flexibility. 

---

## How GPA is Calculated

Before diving into the formula, here’s a quick breakdown of grades and their corresponding scores:

| Grade | Score |
|-------|-------|
| O     | 10    |
| A+    | 9     |
| A     | 8     |
| B+    | 7     |
| B     | 6     |
| C+    | 5     |
| C     | 4     |

### Calculation Method:

1. Multiply the score of each grade by its credit to calculate the **subject score**.
   - Example: If you scored an **A+** in Mathematics (👏 congrats!) and the credit is 4, then the score for Mathematics is **4 x 9 = 36**.

2. Add up the scores for all subjects.

3. Divide the total score by the **sum of the credits**.

   Here’s the formula:
   
   ```
   GPA = (Sum of (Grade x Credit)) / (Sum of Credits)
   ```

And there you have it! Easy, right? 

P.S. Both GPA and CGPA are calculated using the same method, so *technically*, you can add multiple semesters and calculate your CGPA up to that point.

```
If the app calculates both GPA and CGPA, does that make it a GPA calculator, a CGPA calculator, or something in between? 🤔
```

---

## Clone

Here’s how you can clone this project and get started:

```bash
# Clone the repo
git clone https://github.com/Stephenpaul-03/GPA-Calculator-v2.git

# Navigate to the project folder
cd GPA-Calculator-v2

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Usage

### Presets
The *star of the show* in terms of features in this version is **presets**. If your college, year of study, and department are available in the presets, you’re golden. 

1. Open the app.
2. Use the **drawer** to select:
   - College
   - Year of study
   - Department
3. Pick one or more semesters.
4. Apply preset
5. Calculate your GPA effortlessly.

### Manual Entry
Couldn’t find your college or year of study? No worries! You can:

1. Manually enter subject names, credits, and grades.
2. Calculate the GPA or CGPA.

If you think your college should be added to the presets, reach out to me (contact details below). I’m also working on a semi-automatic way to add colleges using Python and Excel sheets.

---

## Export Options
Once you’ve calculated your GPA, you can flex your results by downloading them as:
- PNG
- Excel
- PDF

Whether it’s for bragging rights or sending it to your family, I’ve got you covered. 

---

## Future Implementations
Here’s what’s cooking for future updates:
- **Semi-automatic addition of colleges and credits** using Excel sheets.
- **Dark mode** (Put those forks down, I ran out of time!).

---

## Known Bugs
- The horizontal view for mobile is a bit wonky. I’ll fix it soon.
- When downloading images in mobile view, only the currently visible content is captured. 

---

## Contact Me
Got feedback? Found a bug? Just want to say hi? Reach out!

- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/stephen-paul-i/)
- **Gmail**: stephenpaul4040@gmail.com

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgements
This project wouldn’t have been possible without these amazing resources:
- [**React Docs**](https://reactjs.org/docs/getting-started.html)
- [**Vite Docs**](https://vitejs.dev/guide/)
- [**Chakra UI Docs**](https://chakra-ui.com/docs)
- **ChatGPT**
- **Claude**
- **School Icons** by Freepik - [Flaticon](https://www.flaticon.com/free-icons/school)

Thanks for checking out GPA Calculator v2. Happy calculating! 🎉

