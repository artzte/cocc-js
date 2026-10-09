import COURSE_DATA from './data.js'

export function filterBuilder() {
  const data = JSON.parse(JSON.stringify(COURSE_DATA))
  const normalizedData = data.map((course) =>
    `${course.id}|${course.code}|${course.title}|${course.credits}|${course.department}`.toLowerCase(),
  )

  return {
    getFilteredCourses: (filterString) => {
      const lowercasedFilterString = filterString.toLowerCase().trim()

      if (!lowercasedFilterString) return data

      const filteredCourses = normalizedData.map((item, i) =>
        item.includes(lowercasedFilterString) ? data[i] : null,
      )
      return filteredCourses.filter((course) => course)
    },
  }
}
