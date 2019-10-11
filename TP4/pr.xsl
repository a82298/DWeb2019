<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method= "xhtml" indent="yes" encoding="UTF-8"/>
    <xsl:template match="/">
        <xsl:result-document href="pr.html">
            <html>
                <style>
                    
                    ul {
                    list-style: circle inside;
                    }
                    
                </style>
                
                <head>
                    
                    <title>Project Record</title>
                    
                    <meta charset="UTF-8"></meta>
                    
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                
                <body>
                    
                    <div style="background-color:red"><center>
                        <h1><font size="20"><b>Project Record</b></font></h1>
                    </center></div>
                    
                    <xsl:apply-templates select="pr/metadata"/>
                    
                    <xsl:apply-templates select="pr/workteam"/>
                    
                    <xsl:apply-templates select="pr/abstract"/>
                    
                    <xsl:apply-templates select="pr/deliverables"/>
                    
                </body>
                
                
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <xsl:template match="pr/metadata">
        <table class="w3-striped">
            
            <tr>
                <th><b>KEYNAME:</b></th> <td> <xsl:value-of select="keyname"/> </td>
            </tr>
            <tr>
                <th><b>TITLE:</b></th> <td> <xsl:value-of select="title"/> </td>
            </tr>
            <tr>
                <th><b>SUBTITLE:</b></th> <td> <xsl:value-of select="subtitle"/> </td>
            </tr>
            <tr>
                <th><b>BEGIN DATE:</b></th> <td> <xsl:value-of select="bdate"/> </td>
            </tr>
            <tr>
                <th><b>END DATE:</b></th> <td> <xsl:value-of select="edate"/> </td>
            </tr>
            <tr>
                <th><b>SUPERVISOR:</b></th>
                <td> 
                    <address>
                        <a href="{supervisor/@homepage}"> <xsl:value-of select="supervisor"/> </a>
                    </address>
                </td>
            </tr>
            
        </table>
        
        
    </xsl:template>
    
    <xsl:template match="pr/workteam">
        
        <div style="background-color:blue">
            <h3><center>
                <font size="5"><b>WORK TEAM</b></font>
            </center></h3>
        </div>
        
        
        <xsl:apply-templates select="worker"/>
        
        
    </xsl:template>
    
    <xsl:template match="pr/abstract">
        <div style="background-color:blue">
            <h3><center>
                <font size="5"><b>ABSTRACT</b></font>
            </center></h3>
        </div>
        
        <xsl:apply-templates select="p"/>
        
    </xsl:template>
    
    <xsl:template match="pr/deliverables">
        <div style="background-color:blue"><center>
            <h3><b>DELIVERABLES</b></h3>
        </center></div>
        
        <xsl:apply-templates select="deliverable"/>
    </xsl:template>
    
    <xsl:template match="worker"> 
        <li>
            <a>
                <xsl:value-of select="identifier"/> - <xsl:value-of select="name"/> ( <xsl:value-of select="email"/> ) - <a href="{git}"><xsl:value-of select="git"/></a>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
           <a href="{@path}">
                <xsl:value-of select="."/>
           </a>
        </li>
    </xsl:template>
    
    
    
    
</xsl:stylesheet>