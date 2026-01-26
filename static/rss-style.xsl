<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<html lang="en">
			<head>
				<meta charset="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
				<style>
					/* Using colors from _variables.scss */
					:root {
						--background: #140913;
						--foreground: #fcfdfc;
						--golden: #ffc430;
						--pink: #f133bd;
						--red: #ff0f4f;
					}

					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}

					body {
						font-family: "EB Garamond", Georgia, serif;
						background-color: var(--background);
						color: var(--foreground);
						line-height: 1.6;
						min-height: 100vh;
					}

					.container {
						max-width: 800px;
						margin: 0 auto;
						padding: 2rem 1rem;
					}

					.header {
						text-align: center;
						margin-bottom: 3rem;
						padding-bottom: 2rem;
						border-bottom: 1px solid rgba(255, 196, 48, 0.3);
					}

					.logo {
						width: 96px;
						height: 96px;
						margin-bottom: 1rem;
					}

					h1 {
						color: var(--golden);
						font-size: 2.5rem;
						margin-bottom: 0.5rem;
						font-weight: 400;
						font-style: italic;
					}

					.description {
						color: rgba(252, 253, 252, 0.7);
						font-size: 1.1rem;
					}

					.subscribe-info {
						background: rgba(255, 196, 48, 0.1);
						border: 1px solid rgba(255, 196, 48, 0.3);
						border-radius: 4px;
						padding: 1rem 1.5rem;
						margin-bottom: 2rem;
						font-family: "Victor Mono", monospace;
						font-size: 0.875rem;
					}

					.subscribe-info strong {
						color: var(--golden);
					}

					.subscribe-info code {
						background: rgba(0, 0, 0, 0.3);
						padding: 0.2rem 0.5rem;
						border-radius: 3px;
						color: var(--pink);
						word-break: break-all;
					}

					.posts-list {
						list-style: none;
					}

					.post-item {
						background: rgba(255, 255, 255, 0.02);
						border: 1px solid rgba(255, 196, 48, 0.2);
						border-radius: 4px;
						padding: 1.5rem;
						margin-bottom: 1.5rem;
						transition: all 0.3s ease;
					}

					.post-item:hover {
						border-color: var(--golden);
						box-shadow: 0 0 20px rgba(255, 196, 48, 0.15);
					}

					.post-title {
						font-size: 1.5rem;
						margin-bottom: 0.5rem;
					}

					.post-title a {
						color: var(--golden);
						text-decoration: none;
						transition: color 0.2s ease;
					}

					.post-title a:hover {
						color: var(--pink);
					}

					.post-date {
						font-family: "Victor Mono", monospace;
						font-size: 0.875rem;
						color: rgba(255, 196, 48, 0.7);
						text-transform: uppercase;
						margin-bottom: 0.75rem;
					}

					.post-description {
						color: rgba(252, 253, 252, 0.8);
						line-height: 1.7;
					}

					.footer {
						text-align: center;
						margin-top: 3rem;
						padding-top: 2rem;
						border-top: 1px solid rgba(255, 196, 48, 0.3);
						font-family: "Victor Mono", monospace;
						font-size: 0.875rem;
						color: rgba(252, 253, 252, 0.5);
					}

					.footer a {
						color: var(--golden);
						text-decoration: none;
					}

					.footer a:hover {
						text-decoration: underline;
					}

					@media (max-width: 600px) {
						h1 {
							font-size: 1.75rem;
						}

						.post-item {
							padding: 1rem;
						}

						.post-title {
							font-size: 1.25rem;
						}
					}
				</style>
			</head>
			<body>
				<div class="container">
					<header class="header">
						<img class="logo" src="/logo.png" alt="retronav logo" />
						<h1><xsl:value-of select="/rss/channel/title"/></h1>
						<p class="description"><xsl:value-of select="/rss/channel/description"/></p>
					</header>

					<div class="subscribe-info">
						<strong>Subscribe to this feed:</strong> Copy this URL into your RSS reader:
						<br/><code><xsl:value-of select="/rss/channel/link"/>/rss.xml</code>
					</div>

					<ul class="posts-list">
						<xsl:for-each select="/rss/channel/item">
							<li class="post-item">
								<h2 class="post-title">
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="link"/>
										</xsl:attribute>
										<xsl:value-of select="title"/>
									</a>
								</h2>
								<div class="post-date">
									<xsl:value-of select="pubDate"/>
								</div>
								<p class="post-description">
									<xsl:value-of select="description"/>
								</p>
							</li>
						</xsl:for-each>
					</ul>

					<footer class="footer">
						<p>
							<a>
								<xsl:attribute name="href">
									<xsl:value-of select="/rss/channel/link"/>
								</xsl:attribute>
								&#x2190; Back to website
							</a>
						</p>
					</footer>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
