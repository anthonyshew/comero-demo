import React from "react"
import '../styles/reset.scss'
import '../styles/global.scss'
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import ReturnToTop from "./returnToTop"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query layoutQuery {
      companyLogo: file(absolutePath: {regex: "/logo.jpg/"}) {
        childImageSharp {
          fixed(width: 300, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      hero: file(absolutePath: {regex: "/hero.jpg/"}) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      contentJson {
        restaurantMotto
        restaurantName
        restaurantAbout
        address {
          state
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  const { restaurantMotto, restaurantName } = data.contentJson

  let header, footer

  header = (
    <>
      <Navbar data={data} scrollTopFocus="scrollTopFocus" />
      <div className="hero-container">
        <Image className="hero-image" fluid={data.hero.childImageSharp.fluid} alt={`${data.contentJson.restaurantName}'s Restaurant & Food.`} />
        <div className="flex-container">
          <Image className="header-logo" fixed={data.companyLogo.childImageSharp.fixed} alt="Restaurant logo." />
          <div className="text-content">
            <h1>{restaurantName}</h1>
            <h2>{restaurantMotto}</h2>
          </div>
        </div>
      </div>
    </>
  )
  footer = (
    <>
      <ReturnToTop />
      <Navbar data={data} />
      <TermsOfUse data={data} />
      <Navbar data={data} />
      <a className="attribution" href="https://shewperman.dev" target="_blank" rel="noopener noreferrer">This website was created by <span className="underline">Shewperman Web & Software Development</span>.</a>
    </>
  )

  return (
    <>
      <header className="header">{header}</header>
      <main className="main">{children}</main>
      <footer className="footer">{footer}</footer>
    </>
  )
}

export default Layout

const Navbar = ({ data, scrollTopFocus }) => (
  <nav id="home" className="navbar">
    <a id={scrollTopFocus} href="#home">Home</a>
    <a href="#store">Location & Hours</a>
    <a href="#menu">Menu</a>
    {data.contentJson.restaurantAbout.length > 0 ? <a href="#about">About</a> : null}
  </nav>
)

const TermsOfUse = ({ data }) => (
  <div className="terms-of-use">
    <h1>{data.site.siteMetadata.title} Terms of Service</h1>
    <h2>1. Terms</h2>
    <p>By accessing the website at <a href={`${data.site.siteMetadata.siteUrl}`}>{data.site.siteMetadata.siteUrl}</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
    <h2>2. Use License</h2>
    <ol>
      <li>Permission is granted to temporarily download one copy of the materials (information or software) on {data.site.siteMetadata.title}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
<ol>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on {data.site.siteMetadata.title}'s website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ol>
      </li>
      <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by {data.site.siteMetadata.title} at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
    </ol>
    <h2>3. Disclaimer</h2>
    <ol>
      <li>The materials on {data.site.siteMetadata.title}'s website are provided on an 'as is' basis. {data.site.siteMetadata.title} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
      <li>Further, {data.site.siteMetadata.title} does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
    </ol>
    <h2>4. Limitations</h2>
    <p>In no event shall {data.site.siteMetadata.title} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {data.site.siteMetadata.title}'s website, even if {data.site.siteMetadata.title} or a {data.site.siteMetadata.title} authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
    <h2>5. Accuracy of materials</h2>
    <p>The materials appearing on {data.site.siteMetadata.title}'s website could include technical, typographical, or photographic errors. {data.site.siteMetadata.title} does not warrant that any of the materials on its website are accurate, complete or current. {data.site.siteMetadata.title} may make changes to the materials contained on its website at any time without notice. However {data.site.siteMetadata.title} does not make any commitment to update the materials.</p>
    <h2>6. Links</h2>
    <p>{data.site.siteMetadata.title} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {data.site.siteMetadata.title} of the site. Use of any such linked website is at the user's own risk.</p>
    <h2>7. Modifications</h2>
    <p>{data.site.siteMetadata.title} may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
    <h2>8. Governing Law</h2>
    <p>These terms and conditions are governed by and construed in accordance with the laws of {data.contentJson.address.state} and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
  </div>
)