import { CourseFilter } from './filter-class.js'
import { getFilteredCourses } from './filter-classic-module.js'
import { filterBuilder } from './filter-functional-closure.js'
import data from './data.js'

function renderCourses(element, courses) {
  const rows = courses
    .map(
      ({ id, code, title, credits, department }) => `
      <tr>
        <td>${id}</td>
        <td>${code}</td>
        <td>${title}</td>
        <td>${credits}</td>
        <td>${department}</td>
      </tr>`,
    )
    .join('')

  element.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>code</th>
          <th>title</th>
          <th>credits</th>
          <th>department</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}

const filterObject = new CourseFilter()
const moduleGetFilteredCourses = getFilteredCourses
const functionalGetFilteredCourses = filterBuilder().getFilteredCourses

export function renderApp() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <h1>Courses</h1>
    <form id="filter-form">
      <input type="text" placeholder="Filter by anything" name="filter" />
      <button type="submit">Filter</button>
    </form>
    <p id='courses'></p>
  `
  const div = app.querySelector('#courses')

  renderCourses(div, data)

  const form = app.querySelector('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const filterString = event.target.querySelector('[name="filter"]').value
    const filteredCourses = filterObject.getFilteredCourses(filterString)
    // const filteredCourses = moduleGetFilteredCourses(filterString)
    // const filteredCourses = functionalGetFilteredCourses(filterString)

    renderCourses(div, filteredCourses)
  })
}
