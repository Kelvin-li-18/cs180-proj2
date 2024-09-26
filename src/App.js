import React from 'react';
import Navbar from './components/Navbar';
import ParentSection from './components/ParentSection';

function App() {
  const parentSections = [
    {
      id: 'edge-detector',
      title: 'Edge Detection Filters',
      sections: [
        {
          id: 'derivatives-and-gradient',
          title: 'Derivatives and Gradient',
          content: [
            { type: 'paragraph', text: 'Inspired by the partial derivative, the finite difference filters represent the respective partial derivatives in the x and y directions. These filters can be convolved with an input image to obtain edges. Convolving an image with the Dx filter will highlight vertical edges, while convolving with the Dy filter will highlight horizontal edges.' },
            { type: 'math', text: '\\( \\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}, \\quad \\frac{\\partial f}{\\partial y} = \\lim_{h \\to 0} \\frac{f(y+h) - f(y)}{h} \\)' },
            { type: 'math', text: '\\( D_x = \\begin{bmatrix} 1 & -1 \\end{bmatrix}, \\quad D_y = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix} \\)' },
            { type: 'paragraph', text: 'A way to capture both the horizontal and vertical edges is via the gradient magnitude. The gradient magnitude can be computed element-wise from the images filtered by Dx and Dy.' },
            { type: 'math', text: '\\( ||\\nabla f||_2 = \\sqrt{\\left( \\frac{\\partial f}{\\partial x} \\right)^2 + \\left( \\frac{\\partial f}{\\partial y} \\right)^2} \\)' },
            { type: 'paragraph', text: 'After obtaining the Dx-filtered, Dy-filtered, and gradient magnitude images, we can binarize them using an appropriate threshold to get a clearer edge image.' },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Original', imageUrl: `${process.env.PUBLIC_URL}/images/cameraman.png` },
                { title: 'Dx', imageUrl: `${process.env.PUBLIC_URL}/images/binary_dx_edges.png` },
                { title: 'Dy', imageUrl: `${process.env.PUBLIC_URL}/images/binary_dy_edges.png` },
                { title: 'Gradient Magnitude', imageUrl: `${process.env.PUBLIC_URL}/images/binary_gradient_magnitude.png` },
              ],
            },
          ],
        },
        {
          id: 'd-o-g',
          title: 'Derivative of Gaussian',
          content: [
            { 
              type: 'paragraph', 
              text: 'The results from finite difference filters are often noisy since the kernels are small and sensitive to local noise. To reduce this, the image can first be smoothed using a Gaussian kernel before applying the finite difference filters.'
            },
            { 
              type: 'paragraph', 
              text: 'From the associative property of convolution, instead of performing two separate convolutions — first with the Gaussian kernel and then with the finite difference filter — we can convolve the Gaussian kernel with the finite difference filter first, forming a derivative of Gaussian filter. Convolving the image directly with this filter produces the same result. This can be verified by asserting np.allclose() on the outputs of two separate convolutions and the single convolution with the derivative of Gaussian filter.'
            },
            { 
              type: 'math', 
              text: '\\((f * g) * D_x = f * (g * D_x)\\)'
            },
            { 
              type: 'paragraph', 
              text: 'Convolving with the derivative of Gaussian filters produces less noisy edge images since the Gaussian blur helps even out local variations and noise. This results in an image with more distinct edges that better outline the overall structure of the input image.'
            },
            {
              type: 'image-grid',
              columns: 2,
              images: [
                { title: 'Dx of Gaussian', imageUrl: `${process.env.PUBLIC_URL}/images/dx_of_g.png` },
                { title: 'Dy of Gaussian', imageUrl: `${process.env.PUBLIC_URL}/images/dy_of_g.png` },
              ],
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Smoothed Image', imageUrl: `${process.env.PUBLIC_URL}/images/blurred_cameraman.jpg` },
                { title: 'Dx (Smoothed)', imageUrl: `${process.env.PUBLIC_URL}/images/smoothed_binary_dx_of_g.jpg` },
                { title: 'Dy (Smoothed)', imageUrl: `${process.env.PUBLIC_URL}/images/smoothed_binary_dy_of_g.jpg` },
                { title: 'Gradient Magnitude (Smoothed)', imageUrl: `${process.env.PUBLIC_URL}/images/smoothed_binary_gradient_magnitude_d_of_g.jpg` },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'image-sharpening',
      title: 'Image Sharpening Filters',
      sections: [
        {
          id: 'image-sharpening-explanation',
          title: 'Unsharp Mask Filter',
          content: [
            { 
              type: 'paragraph', 
              text: 'A technique to make an image sharper is to amplify the high-frequency components. This makes the image appear sharper because our visual perception tends to associate sharpness with stronger contrast in the fine details. Although the image appears sharper, it is a less accurate representation of the true image.'
            },
            { 
              type: 'paragraph', 
              text: 'To achieve this, we first blur the image by convolving it with a Gaussian filter. We then subtract the blurred image from the original to isolate the high-frequency components. By adding a scaled version of this high-frequency image back to the original, we obtain the sharpened result. These steps can be combined into a single convolution operation. Here, delta represents the dirac-delta/ unit impulse filter.'
            },
            { 
              type: 'math', 
              text: '\\( f + \\alpha (f - (f * g)) = f * ((1 + \\alpha)\\delta - \\alpha g) \\)'
            },
            { 
              type: 'paragraph', 
              text: 'Some examples are shown below:'
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Singapore River', imageUrl: `${process.env.PUBLIC_URL}/images/clarkequay.jpg` },
                { title: 'Singapore River Sharpened', imageUrl: `${process.env.PUBLIC_URL}/images/clarkequay_sharp.png` },
                { title: 'Taj Mahal', imageUrl: `${process.env.PUBLIC_URL}/images/taj.jpg` },
                { title: 'Taj Mahal Sharpened', imageUrl: `${process.env.PUBLIC_URL}/images/taj_sharp.png` },
              ],
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Mount Rainier', imageUrl: `${process.env.PUBLIC_URL}/images/rainier.jpg` },
                { title: 'Mount Rainier Sharpened', imageUrl: `${process.env.PUBLIC_URL}/images/rainier_sharp.png` },
                { title: 'Mount Fuji', imageUrl: `${process.env.PUBLIC_URL}/images/fuji.png` },
                { title: 'Mount Fuji Sharpened', imageUrl: `${process.env.PUBLIC_URL}/images/fuji_sharp.png` },
              ],
            },
            { 
              type: 'paragraph', 
              text: 'Here are more examples where an originally sharp image is blurred and then resharpened:'
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Palacio de Cibeles', imageUrl: `${process.env.PUBLIC_URL}/images/madrid2.jpg` },
                { title: 'Blurred', imageUrl: `${process.env.PUBLIC_URL}/images/madrid2_blurred.png` },
                { title: 'Resharpened', imageUrl: `${process.env.PUBLIC_URL}/images/madrid2_sharp.png` },
              ],
            },
            { 
              type: 'paragraph', 
              text: 'The resharpened image is less sharp than the original because blurring removes the highest frequency information. Resharpening the blurred image can only amplify the remaining next highest frequency information but it cannot recover the information that is lost from blurring.'
            },
          ],
        },
      ],
    },
    {
      id: 'hybrid-images',
      title: 'Hybrid Images',
      sections: [
        {
          id: 'human-perception',
          title: 'Human Perception',
          content: [
            { type: 'paragraph', text: 'Different frequencies dominate human perception based on viewing distance. When viewing an image up close, the high frequencies dominate as we tend to observe finer details. As viewing distance increases, lower frequency features such as outlines and large shapes become more prominent.' },
            { type: 'paragraph', text: 'This gives rise to the idea of superimposing 2 images - one with high frequency elements and one with low frequency elements. This hybrid image will thus appear different based on viewing distance where the high frequency image dominates short viewing distances and the low frequency image dominates long viewing distances.' },
          ],
        },
        {
          id: 'general-approach',
          title: 'General Approach',
          content: [
            { type: 'paragraph', text: 'Start with 2 images A and B. Suppose image A is the image that we want to dominate up close and image B is the one that we want to dominate from a further viewing distance. Convolve image A with a high pass filter and image B with a low pass filter. A recommended high pass filter is the impulse filter minus gaussian filer, while a recommended low pass filter is a gaussian filter. Finally, superimpose the 2 filtered images. ' },
            {
              type: 'math', 
              text: '\\(Hybrid = A * g + B * (\\delta - g)\\)'
            }
          ],
        },
        {
          id: 'fourier-analysis',
          title: 'Fourier Analysis',
          content: [
            { type: 'paragraph', text: 'For better results, there should be a large gap (see figures below) in the fourier response of the 2 filters to prevent them interfering with one another at the low and high spatial scales. This can be done by setting lower values of sigma for the gaussian filter in the high-pass filter and high values of sigma for the gaussian filter in the low-pass filter. ' },
            {
              type: 'image-grid',
              columns: 2,
              images: [
                { title: 'Small gap', imageUrl: `${process.env.PUBLIC_URL}/images/fourier_response_2.png` },
                { title: 'Larger gap', imageUrl: `${process.env.PUBLIC_URL}/images/fourier_response_1.png` },
              ],
            },
            { type: 'paragraph', text: 'Consider the following hybrid image. Up close, it looks like a school of fish. As viewing distance increases, a more dangerous predator emerges. Up close, we observe the fine details (the small fish), while paying less attention to do background. As viewing distance increases, we are unable to observe the fine details of the fish anymore and can only observe the overall structure and outline of the image - from which we observe the outline of a shark.' },
            {
              type: 'image-grid',
              columns: 2,
              images: [
                { title: 'Hybrid Image', imageUrl: `${process.env.PUBLIC_URL}/images/fish_shark.jpg` },
                { title: 'Fourier Transform (Hybrid Image)', imageUrl: `${process.env.PUBLIC_URL}/images/fft_hybrid.jpg` },
              ],
            },
            { type: 'paragraph', text: 'The original images used to create this hybrid image are shown below, along with their Fourier transforms. In the Fourier Transform of the hybrid image, we observe a gap in the low frequency and high frequency response.' },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Original Fish Image', imageUrl: `${process.env.PUBLIC_URL}/images/fish.jpeg` },
                { title: 'Fourier Transform', imageUrl: `${process.env.PUBLIC_URL}/images/fft_im1.jpg` },
                { title: 'Fourier Transform after High-pass filter', imageUrl: `${process.env.PUBLIC_URL}/images/fft_im1_highpass.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Original Shark Image', imageUrl: `${process.env.PUBLIC_URL}/images/shark.jpeg` },
                { title: 'Fourier Transform', imageUrl: `${process.env.PUBLIC_URL}/images/fft_im2.jpg` },
                { title: 'Fourier Transform after Low-pass filter', imageUrl: `${process.env.PUBLIC_URL}/images/fft_im2_lowpass.jpg` },
              ],
            },
            { type: 'paragraph', text: 'The different levels of the Laplacian stack of the hybrid image explains how the image we observe slowly changes:' },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Level 1', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_1.jpg` },
                { title: 'Level 2', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_2.jpg` },
                { title: 'Level 3', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_3.jpg` },
                { title: 'Level 4', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_4.jpg` },
                { title: 'Level 5', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_5.jpg` },
                { title: 'Level 6', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_6.jpg` },
                { title: 'Level 7', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_7.jpg` },
                { title: 'Level 8', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_hybrid/hybrid_laplacian_level_8.jpg` },
              ],
            },
          ],
        },
        {
          id: 'optimization',
          title: 'Optimization',
          content: [
            { type: 'paragraph', text: 'It is important to maximize correlation between edges and prominent objects between the 2 images - this means that the 2 images need to be well-aligned before trying to hybridize them. The uncorrelated parts should ideally appear as noise when seen from close/ far respectively.' },
            { type: 'paragraph', text: 'Color can also be used to enhance the effect. Specifically, the receptors in our eyes (cones) that are responsible for observing high frequency details are also responsible for observing color. Adding color to the high frequency image while keeping the low frequency image grayscale will enhance the dominance of the high frequency image up close. For instance, the yellow tail of the fish captures our attention and makes them more prominent up close.'},
            { type: 'paragraph', text: 'Another trick that can be used is to scale the 2 spatial channels by different factors before superimposing them. These scaling constants can be manually tuned for better performance.'},
            {
              type: 'math', 
              text: '\\(Hybrid = \\alpha(A * g) + \\beta(B * (\\delta - g))\\)'
            }
          ],
        },
        {
          id: 'results',
          title: 'More Results',
          content: [
            { type: 'paragraph', text: 'The images on the left are used for the high-spatial scale and the images at the center are used for the low-spatial scale. The hybrid image is on the right. Try clicking on the image and slowly walk away from the screen to observe the effect.' },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Nutmeg', imageUrl: `${process.env.PUBLIC_URL}/images/cat.png` },
                { title: 'Derek', imageUrl: `${process.env.PUBLIC_URL}/images/derek.png` },
                { title: 'Nutmeg-Derek', imageUrl: `${process.env.PUBLIC_URL}/images/derek_cat.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Flowers', imageUrl: `${process.env.PUBLIC_URL}/images/flowers.jpeg` },
                { title: 'Ice Cream', imageUrl: `${process.env.PUBLIC_URL}/images/icecream.jpeg` },
                { title: 'Flowers-IceCream', imageUrl: `${process.env.PUBLIC_URL}/images/flowericecream.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Pomeranian', imageUrl: `${process.env.PUBLIC_URL}/images/pom.jpeg` },
                { title: 'Egg', imageUrl: `${process.env.PUBLIC_URL}/images/egg.jpeg` },
                { title: 'Pom-Egg (Failed)', imageUrl: `${process.env.PUBLIC_URL}/images/hybrid_pomegg.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Pomeranian', imageUrl: `${process.env.PUBLIC_URL}/images/pom2.jpeg` },
                { title: 'Bread', imageUrl: `${process.env.PUBLIC_URL}/images/bread.jpeg` },
                { title: 'Pom-Bread', imageUrl: `${process.env.PUBLIC_URL}/images/hybrid_pom_bread.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Fish', imageUrl: `${process.env.PUBLIC_URL}/images/fish.jpeg` },
                { title: 'Shark', imageUrl: `${process.env.PUBLIC_URL}/images/shark.jpeg` },
                { title: 'Fish-Shark', imageUrl: `${process.env.PUBLIC_URL}/images/fish_shark.jpg` },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'image-blending',
      title: 'Image Blending',
      sections: [
        {
          id: 'motivation',
          title: 'Motivation',
          content: [
            { 
              type: 'paragraph', 
              text: 'A naive way to blend two images together is alpha compositing over a certain blending window.' 
            },
            { 
              type: 'math', 
              text: '\\( I_{blended} = \\alpha I_{left} + (1 - \\alpha) I_{right} \\)' 
            },
            { 
              type: 'paragraph', 
              text: 'A problem with this is that it is often hard to choose a good window size to avoid both ghosting and seams. To avoid ghosting, the window size needs to be less than twice the size of the smallest prominent object; to avoid seams, the window size needs to be greater than the size of the largest prominent object. In other words, good blending can only occur if the frequencies of an image are within one octave:' 
            },
            { 
              type: 'math', 
              text: '\\( f_{max} \\leq 2 \\times f_{min} \\)' 
            },
            {
              type: 'paragraph', 
              text: 'Perhaps we could split the images into different frequency bands where each band is within 1 octave, perform blending on each of these bands separately, and sum up the separately blended bands to obtain the desired results.'
            }
          ]          
        },
        {
          id: 'laplacian-stack',
          title: 'Laplacian Stack',
          content: [
            { type: 'paragraph', text: 'The Laplacian stack splits an image into different frequency bands. First build a Gaussian stack where each level is derived from convolving the original image with a Gaussian kernel of increasing sigma. By taking the difference between 2 consecutive levels of the Gaussian stack, the Laplacian stack represents the band of frequency lost between the 2 levels of the Gaussian stack. The highest level of the Laplacian stack is set to be equal to the highest level of the Gaussian stack since there are no higher levels of the Gaussian stack left to subtract.' },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Laplacian Stack', imageUrl: `${process.env.PUBLIC_URL}/images/laplacianstack.png` },
              ],
            },
            {
              type: 'paragraph', text: 'Each level of the Laplacian stack can be obtained by convolving with the equivalent kernel:'
            },
            {
              type: 'math',
              text: '\\( G_n = f * g_n \\)'
            },
            {
                type: 'math',
                text: '\\( L_n = f * g_n - f * g_{n+1} = f * (g_n - g_{n+1}) \\)'
            },
            {
              type: 'paragraph', text: 'An example of the Fourier Transform of the equivalent kernels are shown below. Recall that we want each level to contain up to 1 octave of frequencies.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Laplacian Stack Fourier Transform', imageUrl: `${process.env.PUBLIC_URL}/images/laplacian_stack_plot.png` },
              ],
            },
            { type: 'paragraph', text: 'A property of the Laplacian stack is that the original image can be perfectly reconstructed by summing together all the levels.' },
            {
              type: 'math',
              text: '\\( I = \\sum_{n=0}^{N} L_n \\)',
            },
          ],
        },
        {
          id: 'multi-resolution-blending',
          title: 'Multi-resolution Blending',
          content: [
            { type: 'paragraph', text: '2 images can be blended together by splitting them into their respective Laplacian stacks, blending each level of the Laplacian stacks separately, and summing together the blended levels to construct the blended image.' },
            { type: 'paragraph', text: 'A mask is then designed to blend the images. As we go up the Laplacian stack, the mask should become increasingly smooth. These stack of masks can be formed by forming a Gaussian stack where each level is formed with the same sigma used to form the corresponding level of the Laplacian stacks.' },
            { type: 'paragraph', text: 'For instance, here is an Apple blended with an Orange' },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Apple', imageUrl: `${process.env.PUBLIC_URL}/images/apple.jpeg` },
                { title: 'Orange', imageUrl: `${process.env.PUBLIC_URL}/images/orange.jpeg` },
                { title: 'Orapple', imageUrl: `${process.env.PUBLIC_URL}/images/blendedappleorange.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Blending Process', imageUrl: `${process.env.PUBLIC_URL}/images/blending.jpg` },
              ],
            },
          ],
        },
        {
          id: 'more-results',
          title: 'More Results',
          content: [
            { type: 'paragraph', text: 'Here are more examples of multi-resolution blending with different image pairs.' },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Pomeranian', imageUrl: `${process.env.PUBLIC_URL}/images/bobo.jpg` },
                { title: 'Tiger', imageUrl: `${process.env.PUBLIC_URL}/images/tiger.jpg` },
                { title: 'Mask', imageUrl: `${process.env.PUBLIC_URL}/images/bobo_mask.jpg` },
                { title: 'Pomger', imageUrl: `${process.env.PUBLIC_URL}/images/pomger.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Whale', imageUrl: `${process.env.PUBLIC_URL}/images/whale.jpg` },
                { title: 'Space', imageUrl: `${process.env.PUBLIC_URL}/images/galaxy.jpg` },
                { title: 'Mask', imageUrl: `${process.env.PUBLIC_URL}/images/whale_mask.jpg` },
                { title: 'Space Whale', imageUrl: `${process.env.PUBLIC_URL}/images/whalespace.jpg` },
              ],
            },
          ],
        },
      ],
    },    
  ];
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-300">
      <Navbar parentSections={parentSections} />
      <div className="flex-1 px-4 lg:px-8 py-8 ml-64 w-full">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">Image Filters</h1>

        {parentSections.map((parent) => (
          <ParentSection
            key={parent.id}
            id={parent.id}
            title={parent.title}
            sections={parent.sections}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
