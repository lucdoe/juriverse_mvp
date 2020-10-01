import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { Router, Request, Response } from 'express'
import { request } from 'http'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

export const sanitizeInput = (input: any): string => {
    return DOMPurify.sanitize(input)
}