# Jekyll hook to fix bibliography year headers and punctuation
# This replaces numeric year codes with proper text in the rendered HTML
# and cleans up double punctuation issues

Jekyll::Hooks.register :pages, :post_render do |page|
  # Only process the publications page
  if page.path.include?('publications')
    # Replace numeric year headers with proper text (with consistent capitalization)
    # Note: Jekyll Scholar converts 9997 to "submitted" automatically, so we replace that
    page.output = page.output.gsub('<h2 class="bibliography">9999</h2>', '<h2 class="bibliography">In Press</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9998</h2>', '<h2 class="bibliography">In Preparation</h2>')
    # Add slight padding-bottom to Preprints header to prevent lowercase 'p' from touching the line
    page.output = page.output.gsub('<h2 class="bibliography">submitted</h2>', '<h2 class="bibliography" style="padding-bottom: 0.15rem;">Preprints</h2>')  # Jekyll Scholar converts 9997 to "submitted"
    page.output = page.output.gsub('<h2 class="bibliography">9997</h2>', '<h2 class="bibliography" style="padding-bottom: 0.15rem;">Preprints</h2>')  # Just in case
    page.output = page.output.gsub('<h2 class="bibliography">9996</h2>', '<h2 class="bibliography">Under Review</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9995</h2>', '<h2 class="bibliography">Accepted</h2>')
    page.output = page.output.gsub('<h2 class="bibliography">9994</h2>', '<h2 class="bibliography">Forthcoming</h2>')
    
    # Clean up double punctuation in the entire output
    page.output = page.output.gsub('?.', '?')  # Question mark followed by period
    page.output = page.output.gsub('!.', '!')  # Exclamation point followed by period
    page.output = page.output.gsub('..', '.')  # Double periods
  end
end 