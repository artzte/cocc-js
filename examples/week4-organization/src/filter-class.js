import COURSE_DATA from './data.js'

export class CourseFilter {
  constructor() {
    this.data = JSON.parse(JSON.stringify(COURSE_DATA))
    this.normalizedData = this.data.map((course) =>
      `${course.id}|${course.code}|${course.title}|${course.credits}|${course.department}`.toLowerCase(),
    )
  }

  getFilteredCourses(filterString) {
    const lowercasedFilterString = filterString.toLowerCase().trim()
    const { data } = this

    if (!lowercasedFilterString) return data

    const filteredCourses = this.normalizedData.map((item, i) =>
      item.includes(lowercasedFilterString) ? data[i] : null,
    )

    return filteredCourses.filter((course) => course)
  }
}
