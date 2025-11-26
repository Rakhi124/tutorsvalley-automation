class DashboardPage {
  analyticsWidget() { return cy.get('[data-testid="analytics-widget"]') }
  upcomingSessionCard() { return cy.get('[data-testid="upcoming-session"]') }
  createQuestionBtn() { return cy.get('button:contains("Create New Question")') }

  verifyAnalyticsMetric(label, expectedText) {
    this.analyticsWidget().contains(label).parent().should('contain', expectedText)
  }
}

export const dashboardPage = new DashboardPage()
